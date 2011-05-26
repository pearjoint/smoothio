
_ = require 'underscore'

smio = global.smoothio

class smio.Session
	@all: {}

	@getBySessionID: (server, sessionID) ->
		sess = null
		if sessionID
			if not (sess = @all[sessionID])
				@all[sessionID] = sess = new smio.Session server, sessionID, server.socket
		sess

	constructor: (@server, @sessionID, @socket) ->
		@inst = @server.inst

	handleFetch: (rc, fr, finish) ->
		smio.logit JSON.stringify fr
		fm =
			e: []
		if not fr
			fr = rc.postData
		if _.isString fr
			try
				fr = JSON.parse fr
			catch err
				fm.e.push @inst.formatError err
		if fr and not _.isString fr
			x = ""
		finish fm

	onEnd: ->

	onInit: ->

