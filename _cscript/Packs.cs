
_ = require 'underscore'
_.mixin require 'underscore.string'
coffee = require 'coffee-script'
node_fs = require 'fs'
node_path = require 'path'
node_util = require 'util'
stylus = require 'stylus'

require './Control'
smio = global.smoothio

class smio.Pack
	constructor: (@inst, @packs, @packPath, @packName) ->
		@loaded = false
		@loadError = null
		@dependsOn = {}
		@config = {}

	load: ->
		if (not @loaded) and (not @loadError?)
			try
				smio.logit (@inst.r 'log_pack_loading', @packName), 'packs.' + @packName
				lastFilePath = cfgFilePath = node_path.join @packPath, 'pack.config'
				@config = @inst.util.inst.mergeConfigWithDefaults (JSON.parse @inst.util.fs.readTextFile cfgFilePath), {
					"pack": {
						"dontcopy": ["*.config"]
					}
				}
				if @config.pack['depends_on']? and @config.pack.depends_on.length
					for dep in @config.pack.depends_on	
						@dependsOn[dep] = pack = @packs.all[dep]
						if (not pack?)
							throw new Error @inst.r 'log_pack_error_depends1', dep
						if (not pack.loaded)
							if not pack.loadError?
								pack.load()
							if pack.loadError
								throw new Error @inst.r 'log_pack_error_depends2', dep
				smio.walkDir @packPath, null, (fpath, fname, relPath) =>
					outDirPath = node_path.join "server/pub/_packs/#{@packName}", (relPath.substr 0, relPath.lastIndexOf '/')
					if (_.isEndsWith fname, '.styl') and (stylContent = @inst.util.fs.readTextFile fpath)
						lastFilePath = fpath
						stylus(stylContent).set('filename', fpath).render (err, css) =>
							if err
								err['ml_error_filepath'] = fpath
								smio.logit (@inst.r 'log_pack_error_compile', fpath, @inst.formatError err), 'packs.' + @packName
							else if css
								node_fs.writeFileSync (node_path.join outDirPath, (fname.substr 0, fname.lastIndexOf '.') + '.css'), css
					else if (_.isEndsWith fname, '.cs') and (csContent = @inst.util.fs.readTextFile fpath)
						[lastFilePath, ccsContent, ignore] = [fpath, '', false]
						for line in csContent.split '\n'
							if _.isStartsWith line, '#if server'
								ignore = true
							else if _.isStartsWith line, '#endif'
								ignore = false
							else if not ignore
								ccsContent += (line + '\n')
						if (ccsContent = ccsContent.trim()) and jsContent = coffee.compile ccsContent
							node_fs.writeFileSync (node_path.join outDirPath, (fname.substr 0, fname.lastIndexOf '.') + '.js'), jsContent
					else if (_.isEndsWith fname, '.ctl') and (tmplContent = @inst.util.fs.readTextFile fpath)
						outDirPath = node_path.join "server/_packs/#{@packName}", (relPath.substr 0, relPath.lastIndexOf '/')
						lastFilePath = fpath
						if jsContent = smio.Control.compile @inst, tmplContent, node_path.join @packName, relPath
							node_fs.writeFileSync (node_path.join outDirPath, (fname.substr 0, fname.lastIndexOf '.') + '.cs'), jsContent
					else
						args = ((@inst.util.fs.isPathMatch fname, pattern) for pattern in @config.pack.dontcopy)
						if not _.any args
							node_fs.linkSync fpath, node_path.join outDirPath, fname
				smio.logit (@inst.r 'log_pack_loaded', @packName), 'packs.' + @packName
				@loaded = true
			catch err
				if (not err['ml_error_filepath']?) and lastFilePath?
					err['ml_error_filepath'] = lastFilePath
				@loadError = err
				smio.logit (@inst.r 'log_pack_error_notloaded', @packName, @inst.formatError err), 'packs.' + @packName

class smio.Packs
	constructor: (@inst) ->
		@all = {}
		@inst.util.fs.ensureDirs '../_core/packs', 'server/pub/_packs'
		@inst.util.fs.ensureDirs '../_core/packs', 'server/_packs'
		@inst.util.fs.ensureDirs 'packs', 'server/pub/_packs'
		@inst.util.fs.ensureDirs 'packs', 'server/_packs'
		for p in @inst.util.array.ensurePos node_fs.readdirSync '../_core/packs', 'SmoothioCore', 0
			if (node_fs.statSync pp = node_path.join '../_core/packs', p).isDirectory()
				@all[p] = new smio.Pack @inst, @, pp, p
		for p in node_fs.readdirSync 'packs'
			if (node_fs.statSync pp = node_path.join 'packs', p).isDirectory()
				@all[p] = new smio.Pack @inst, @, pp, p
		if @corePack = @all['SmoothioCore']
			for p, pack of @all
				pack.load()

