
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

	handleInvoke: (rc, fr, finish) =>
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
			try
				freq = new smio.FetchRequestMessage(fr)
				hub = new smio.Hub(@, freq.url(), rc)
				switch (tmp = freq.cmd())
					when 'f'
						hub.getControlUpdates freq.ticks(), freq, fresp, (err, ctl) ->
							if err
								fresp.errors(err)
							if ctl
								fresp.controls(ctl)
							if not isSocket
								fresp.ticks(smio.Util.DateTime.utcTicks())
							finish(fresp.msg)
					when 's'
						fresp.settings(fi: 15000, bg: '/_/file/images/bg0.jpg')
						finish(fresp.msg)
					else
						fresp.ctlID(freq.ctlID())
						[prefix, cmdName] = tmp.split('.')
						if prefix is 'Hub'
							hub.invoke cmdName, freq, fresp, (err, res) ->
								if err
									fresp.errors(err)
								if res
									fresp.msg[tmp] = res
								finish(fresp.msg)
						else
							smio.logit "WOOT"
			catch err
				fresp.errors(err)
				finish(fresp.msg)

	onEnd: =>

	onInit: =>

