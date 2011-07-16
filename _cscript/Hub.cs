
_ = require 'underscore'
_.mixin require 'underscore.string'
mongodb = require 'mongodb'
node_url = require 'url'

require './shared/PromiseProxy'
require './Database'

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
				makeQuery = (url) -> -> url.indexOf(this.u) is 0
				col.find($where: makeQuery(@url)).toArray (err, results) =>
					return cb_err_hasHubs(err) if err
					if results and results.length
						@doc = _.sortBy(results, (doc) -> -doc.u.length)[0]
						cb_err_hasHubs(null, true)
					else
						col.find().nextObject (err, doc) =>
							cb_err_hasHubs(err, smio.iif(doc))

	create: (freq, fresp, cb) =>
		@dbServer.withCollection "hubs", (err, col) =>
			return cb(err, col) if err
			col.insert { t: freq.msg.t, u: '/' }, (err, docs) =>
				smio.logit JSON.stringify { e: err, d: docs }
				return cb(err, docs)

	invoke: (cmd, freq, fresp, cb) =>
		if cmd is 'create'
			@create(freq, fresp, cb)
		else
			cb(new Error("Unknown command <b>#{cmd}</b>"))

	getControlUpdates: (sinceTicks, freq, fresp, cb) =>
		return cb(null, '': '_': 'Core_Earth_MainFrame')
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

