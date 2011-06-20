
require './Hub'
require './shared/FetchRequestMessage'
require './shared/FetchResponseMessage'
require './shared/Util'
_ = require 'underscore'

smio = global.smoothio

class smio.Session
	@all: {}

	@getBySessionID: (server, sessionID) ->
		sess = null
		if sessionID
			if not (sess = @all[sessionID])
				@all[sessionID] = sess = new smio.Session(server, sessionID, server.socket)
		sess

	constructor: (@server, @sessionID, @socket) ->

	handleFetch: (rc, fr, finish) =>
		isSocket = rc is null
		fresp = new smio.FetchResponseMessage()
		if not fr
			fr = rc.postData
		if _.isString(fr)
			try
				fr = JSON.parse(fr)
			catch err
				fresp.errors(err)
		if fr and not _.isString(fr)
			freq = new smio.FetchRequestMessage(fr)
			hub = new smio.Hub(@, freq.url(), rc)
			if freq.settings()
				fresp.settings(i_h: 4500, i_f: 16000)
			hub.getControlUpdates freq.ticks(), freq, fresp, (err, ctl) ->
				if err
					fresp.errors(err)
				if ctl
					fresp.controls(ctl)
				if not isSocket
					fresp.ticks(smio.Util.DateTime.utcTicks())
				finish(fresp.msg)

	onEnd: =>

	onInit: =>

