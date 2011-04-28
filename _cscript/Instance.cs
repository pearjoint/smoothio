
_ = require 'underscore'
_.mixin require 'underscore.string'
mongodb = require 'mongodb'
node_fs = require 'fs'
node_os = require 'os'
node_path = require 'path'
node_proc = require 'child_process'
node_util = require 'util'

require './shared/Util'
require './Database'
require './Packs'
require './Server'
smio = global.smoothio

class smio.Instance
	constructor: ->
		@logFile = null
		@util = new smio.Util
		@initTime = new Date
		@lastRequestTime = null
		@restartMinUptime = 60
		@resourceSets = {}
		@servers = []
		@mongos = {}
		if (resErrs = @loadResourceSets '../_core/res', false) and resErrs.length
			throw resErrs[0]

	expandLogPath: (path) ->
		if path and ((pos = path.indexOf '*') > 0)
			dt = new Date
			path = "#{path.substr 0, pos}#{@util.formatDate dt}#{path.substr pos + 1}"
		path

	finalizeStart: () ->
		lastInterval = 0
		@mongo = new mongodb.Server @mongoConfig.host, @mongoConfig.port, "autoReconnect": true, "auto_reconnect": true
		@mongos['admin'] = new smio.Database @, @mongo, 'admin', 'MongoDB Admin', null, lastInterval += 500
		@mongos['smoothio_shared'] = new smio.Database @, @mongo, 'smoothio_shared', 'smoothio Shared', null, lastInterval += 500
		for sname, scfg of @config.servers
			if sname? and scfg? and scfg['host']? and scfg['port']? and (not (scfg['disabled'] is true))
				server = new smio.Server @, sname, scfg.host, scfg.port, 1
				@servers.push server
				@mongos["smoothio__#{sname}"] = new smio.Database @, @mongo, "smoothio__#{sname}", "smoothio #{sname}", server, lastInterval += 500

	formatError: (err) ->
		@util.inst.formatError err, @config.smoothio.logging.details, @config.smoothio.logging.stack

	getUptime: () ->
		((new Date).getTime() / 1000) - (@initTime.getTime() / 1000)

	haveAllStopped: ->
		for server in @servers
			if server.status != -1
				false
		if @mongoIsLocal and @mongos['admin'] then @mongoHasShutDown else true

	loadResourceSets: (dirPath, recurse) ->
		errs = []
		smio.walkDir dirPath, null, (fpath, fname) =>
			if _.isEndsWith fname, '.res'
				resBaseName = fname.substr 0, pos = fname.indexOf '.'
				if 'en' is (resLang = if pos is (lpos = fname.lastIndexOf '.') then '' else fname.substr pos + 1, lpos - pos - 1)
					resLang = ''
				if not @resourceSets[resBaseName]?
					generic = {}
					specific = if resLang then {} else generic
					@resourceSets[resBaseName] = { 'en': generic }
					if (specific isnt generic)
						@resourceSets[resBaseName][resLang] = specific
				if resLang and not @resourceSets[resBaseName][resLang]
					@resourceSets[resBaseName][resLang] = {}
				try
					for name, val of resSet = JSON.parse @util.fs.readTextFile fpath
						@resourceSets[resBaseName][if resLang then resLang else 'en'][name] = val
				catch err
					err['ml_error_filepath'] = fpath
					errs.push err
					smio.logit "ERROR parsing resource file:\n#{@formatError err}"
		, null, !recurse
		errs

	r: (resName, args...) ->
		@res '', resName, '', args...

	res: (resSet, resName, lang, args...) ->
		val = ''
		if not resSet
			resSet = 'smoothio'
		if (not lang) and not (lang = @config.smoothio.language)
			lang = 'en'
		if @resourceSets[resSet]?
			if not @resourceSets[resSet][lang]?
				lang = 'en'
			val = @resourceSets[resSet][lang][resName] + ''
		if args and args.length
			val = @util.string.replace val, @util.array.toObject args, (_, i) -> '{' + i + '}'
		if (not val) and lang isnt 'en'
			val = @res resSet, resName, 'en', args...
		val

	start: ->
		defHost = '127.0.0.1'
		try
			@config = @.util.inst.mergeConfigWithDefaults (JSON.parse @util.fs.readTextFile 'instance.config'), {
				"smoothio": {
					"enabled": true,
					"processes": 1,
					"autorestart": { "on_files_changed": false, "on_crash_after_uptime_secs": @restartMinUptime },
					"logging": { "details": false, "stack": false, "path": "server/log/smoothio.log" },
					"language": "en",
					"minify": true,
					"dns_preresolve": { "enabled": (process.platform is 'cygwin'), "hostnames": { "localhost": defHost, "$localhostname": defHost } }
				},
				"mongodb": {
					"host": defHost,
					"port": 61234,
					"dbpath": "server/dbs/",
					"logpath": "server/log/mongodb/mongodb.log"
				}
			}
		catch err
			err.ml_error_filepath = 'instance.config'
			err.message = 'ERROR parsing instance.config: ' + err.message
			throw err
		if (logPath = @expandLogPath @config.smoothio.logging.path)
			try
				node_fs.unlinkSync logPath
			oldLogFunc = smio.logit
			closeLog = () =>
				try
					@logFile.end()
				try
					@logFile.destroySoon()
				@logFile = null
			smio.logit = (line, cat) =>
				full = ''
				if smio['logBuffer']
					full = smio.logBuffer.join('\n') + '\n'
					delete smio.logBuffer
				if @logFile and not @logFile.writable
					closeLog
				if not @logFile
					@logFile = node_fs.createWriteStream logPath, encoding: 'utf-8', mode: 0666
					@logFile.on 'close', closeLog
					@logFile.on 'error', closeLog
				full += (line = JSON.stringify(new Date()) + ' - ' + oldLogFunc(line, cat) + '\n')
				try
					@logFile.write full
		if not @config.smoothio.enabled
			smio.logit "This smoothio instance has been disabled in instance.config."
			return 0
		@packs = new smio.Packs @
		if (not @packs['corePack']?) or (not @packs.corePack.loaded)
			smio.logit @r 'log_pack_nocorepack', 'SmoothioCore'
			return 1
		@mongoConfig = @config.mongodb
		@autoRestart = if (@config.smoothio.autorestart.on_files_changed is true and @config.smoothio.processes is 1) then true else false
		@restartMinUptime = @config.smoothio.autorestart.on_crash_after_uptime_secs
		if @mongoIsLocal = (process.platform isnt 'cygwin') and @mongoConfig.host is defHost
			mongoLogPath = @expandLogPath @mongoConfig.logpath
			try
				node_fs.unlinkSync node_path.join @mongoConfig.dbpath, "mongod.lock"
			node_proc.exec "../_core/bin/#{if process.platform is 'darwin' then 'osx' else 'linux'}/mongod --fork --rest --dbpath #{@mongoConfig.dbpath} --port #{@mongoConfig.port} " + (if mongoLogPath then "--logpath #{mongoLogPath}" else ''), (err, stdout, stderr) =>
				if err
					smio.logit (@r 'log_mongo_error_start', @formatError err), 'mongodb'
					return 1
				else
					smio.logit stdout.trim(), 'mongodb'
					@finalizeStart()
		else
			@finalizeStart()
		-1

	stop: ->
		if @mongoIsLocal and @mongos['admin']
			@mongos['admin'].connect (err, db) =>
				if err?
					smio.logit (JSON.stringify err), 'mongodb'
					@mongoHasShutDown = true
				if db?
					db.executeDbCommand "shutdown": 1, (err, result) =>
						@mongoHasShutDown = true
						smio.logit (JSON.stringify err ? result), 'mongodb'
					@mongoHasShutDown = true
		else
			@mongoHasShutDown = true
		for server in @servers
			server.stop()

