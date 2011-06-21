
require './shared/PromiseProxy'
require './Database'
mongodb = require 'mongodb'
node_url = require 'url'

smio = global.smoothio

class smio.Hub
	constructor: (@session, @url, @rc) ->
		@doc = null
		server = @session.server
		inst = server.inst
		@mongo = inst.getDbServer()
		@dbAdmin = inst.getDb(@mongo, 'admin')
		@dbServer = inst.getDb(@mongo, "smoothio__#{server.serverName}")
		@dbShared = inst.getDb(@mongo, 'smoothio_shared')
		if not @url
			@url = '/'
		@url = @url.toLowerCase()
		@uri = node_url.parse(@url)

	checkExists: (cb_err_hasHubs) =>
		if @doc
			cb_err_hasHubs(null, true)
		else
			@dbServer.withCollection "hubs", (err, col) =>
				return cb_err_hasHubs(err) if err
				makeQuery = (url) -> -> url.indexOf(this.url) is 0
				col.find($where: makeQuery(@url)).toArray (err, results) =>
					return cb_err_hasHubs(err) if err
					if results and results.length
						@doc = _.sortBy(results, (doc) -> -doc.url.length)[0]
						cb_err_hasHubs(null, true)
					else
						col.find().nextObject (err, doc) =>
							cb_err_hasHubs(err, smio.iif(doc))

	create: (args, cb) =>
		null

	invoke: (cmd, freq, fresp, cb) =>
		setTimeout((-> cb(null, null)), 99999999)

	getControlUpdates: (sinceTicks, freq, fresp, cb) =>
		if sinceTicks
			cb(null, {})
		else
			ct = "Core_Controls_MainFrame"
			@checkExists (err, serverHasHubs) ->
				if not serverHasHubs
					if fresp and freq and freq.settings()
						fresp.settings(bg: '/_/file/images/bg0.jpg')
					ct = "Core_ServerSetup_InitialHubSetup"
				cb(err, '': '_': ct)

