smio = global.smoothio

class smio.Socket
	constructor: (@client, isSocketIO, host, secure, port) ->
		@offline = false
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
				msg:
					last: null
					next: {}
				intervals:
					heartbeat:
						val: 4500
						handle: null
					fetch:
						val: 20000
						handle: null
					sleepyFactor: 4
				lastResponseTime: 0
				lastSendTime: 0
				send: (heartbeat, force) =>
					if force or not @poll.busy
						@poll.busy = true
						if heartbeat
							data = null
						else
							@poll.msg.last = data = @poll.msg.next
							@poll.msg.next = {}
						($.post "/_/poll/#{if heartbeat then 'p' else 'f'}/?t=#{smio.Util.DateTime.ticks()}", data, ((m, t, x) => @onMessage m, t, x), 'html').error (x, t, e) => @onError x, t, e

	connect: ->
		if @socket
			@socket.connect()
		else if @poll
			@setTimers()
			@poll.send false, true

	onError: (xhr, textStatus, error, url) ->
		if @poll
			if xhr and (xhr.status is 0) and (xhr.readyState is 0)
				@onOffline()
			else
				@onOnline()
				if xhr and xhr.responseText
					alert xhr.responseText
				else
					alert "#{textStatus}\n\n#{JSON.stringify error}\n\n#{JSON.stringify xhr}"
			@poll.busy = false

	onOffline: ->
		if not @offline
			@offline = true
			$('#smio_offline').show()

	onOnline: ->
		if @offline
			@offline = false
			$('#smio_offline').hide()

	onMessage: (msg, textStatus, xhr) ->
		data = null
		if _.isString msg
			try
				data = JSON.parse msg
			catch err
				@onError err
		if @poll
			@onOnline()
			@poll.busy = false

	onSleepy: (yeap) ->
		@setTimers()
		$('#smio_sleepy')[if yeap then 'show' else 'hide']()

	onSocketClose: ->

	onSocketConnect: ->
		@onOnline()

	onSocketConnectFailed: ->
		@onOffline()

	onSocketConnecting: (type) ->
		@onOffline()

	onSocketDisconnect: ->
		@onOffline()

	onSocketReconnect: (type, attempts) ->
		@onOnline()

	onSocketReconnectFailed: ->
		@onOffline()

	onSocketReconnecting: (delay,attempts) ->
		@onOffline()

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

