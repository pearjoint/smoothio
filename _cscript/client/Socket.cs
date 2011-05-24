smio = global.smoothio

class smio.Socket
	constructor: (@client, isSocketIO, host, secure, port) ->
		@sessionID = ''
		if isSocketIO
			opts = resource: '/_/sockio/', rememberTransport: false, connectTimeout: 5000, secure: secure is true
			if port
				opts.port = port
			@socket = new io.Socket host, opts
			@socket.on 'connect', => @onSocketConnect()
			@socket.on 'connect_failed', => @onSocketConnectFailed()
			@socket.on 'connecting', (type) => @onSocketConnecting type
			@socket.on 'close', => @onSocketClose()
			@socket.on 'disconnect', => @onSocketDisconnect()
			@socket.on 'message', (msg) => @onMessage msg
			@socket.on 'reconnect', (type, attempts) => @onSocketReconnect type, attempts
			@socket.on 'reconnect_failed', => @onSocketReconnectFailed()
			@socket.on 'reconnecting', (delay, attempts) => @onSocketReconnecting delay, attempts
		else
			@poll =
				busy: false
				paused: false
				intervals:
					heartbeat:
						val: 2000
						handle: null
					fetch:
						val: 8000
						handle: null
					sleepyFactor: 4
				lastResponseTime: 0
				lastSendTime: 0
				send: (heartbeat, force) ->
					if force or not (@poll.busy or @poll.paused)
						@poll.busy = @poll.paused = true

	connect: ->
		if @socket
			@socket.connect()
		else if @poll
			@setTimers()
			@poll.send false, true

	onError: (xhr, textStatus, error) ->
		@poll.busy = false
		@poll.paused = true
		@poll.paused = not confirm "onError -- continue/retry?"

	onOffline: ->
		alert "onOffline"

	onOnline: ->
		alert "onOnline"

	onMessage: (msg) ->
		@sockLog "Message: [#{msg}]"
		if (not @sessionID) and @socket.transport['sessionid']
			@sessionID = @socket.transport.sessionid

	onSleepy: (yeap) ->
		@setTimers()

	onSocketClose: ->
		@sockLog 'Closed'

	onSocketConnect: ->
		@sockLog 'Connected'
		if (not @sessionID) and @socket.transport['sessionid']
			@sessionID = @socket.transport.sessionid

	onSocketConnectFailed: ->
		@sockLog 'Connect Failed'
		@sessionID = ''

	onSocketConnecting: (type) ->
		@sockLog "Connecting [#{type}]"
		@sessionID = ''

	onSocketDisconnect: ->
		@sockLog 'Disconnected'
		@sessionID = ''

	onSocketReconnect: (type, attempts) ->
		@sockLog "Reconnected: #{type} after #{attempts} attempts"
		if (not @sessionID) and @socket.transport['sessionid']
			@sessionID = @socket.transport.sessionid

	onSocketReconnectFailed: ->
		@sockLog 'Reconnect Failed'
		@sessionID = ''

	onSocketReconnecting: (delay,attempts) ->
		@sockLog "Reconnecting in #{delay} ms, #{attempts} attempts"
		@sessionID = ''

	clearTimers: () ->
		@setTimer 'heartbeat'
		@setTimer 'fetch'

	setTimer: (name, fn) ->
		obj = @poll.intervals[name]
		val = if @client.sleepy then (obj.val * @poll.intervals.sleepyFactor) else obj.val
		if obj['handle']
			clearInterval obj.handle
		if fn
			obj.handle = setInterval fn, val

	setTimers: () ->
		@setTimer 'heartbeat', () => @poll.send true
		@setTimer 'fetch', () => @poll.send false

	sockLog: (msg) ->
		$('#smio_log').prepend "<div><b>#{JSON.stringify new Date()}</b> &mdash; #{msg}</div>"

