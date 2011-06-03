
require './shared/PromiseProxy'
require './Database'
mongodb = require 'mongodb'
node_url = require 'url'

smio = global.smoothio

class smio.Site
	constructor: (@session, @url, @rc) ->
		@server = @session.server
		@doc = null
		@inst = @server.inst
		@mongo = @inst.getDbServer()
		@dbAdmin = @inst.getDb @mongo, 'admin'
		@dbServer = @inst.getDb @mongo, "smoothio__#{@server.serverName}"
		@dbShared = @inst.getDb @mongo, 'smoothio_shared'
		if not @url
			@url = '/'
		@url = @url.toLowerCase()
		@uri = node_url.parse @url

	checkExists: (cb_err_hasSites) ->
		if @doc
			cb_err_hasSites null, true
		else
			@dbServer.withCollection "_smio_sites", (err, col) =>
				return cb_err_hasSites err if err
				makeQuery = (url) -> -> (url.indexOf this._smio_url) is 0
				(col.find $where: (makeQuery @url)).toArray (err, results) =>
					return cb_err_hasSites err if err
					if results and results.length
						@doc = (_.sortBy results, (doc) -> -doc._smio_url.length)[0]
						cb_err_hasSites null, true
					else
						col.find().nextObject (err, doc) =>
							cb_err_hasSites err, if doc then true else false	

	getControlUpdates: (sinceTicks, cb) ->
		if sinceTicks
			cb null, {}
		else
			ct = "Core_Controls_MainFrame"
			@checkExists (err, serverHasSites) ->
				if not serverHasSites
					ct = "Core_ServerSetup_InitialSiteSetup"
				cb err, { "": { "_": ct } }

