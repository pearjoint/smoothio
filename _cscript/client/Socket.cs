smio = global.smoothio

class smio.Socket
	constructor: (@client, isSocketIO, host, secure, port) ->
		@offline = 1
		@offlineBlinkIntervalHandle = null
		@initialFetchDone = false
		if isSocketIO
			opts = resource: '/_/sockio/', transports: ['websocket'], rememberTransport: false, reconnect: true, connectTimeout: 5000, secure: secure is true
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
					next: @newFetchRequest()
				intervals:
					heartbeat:
						val: 0
						handle: null
					fetch:
						val: 0
						handle: null
					sleepyFactor: 4
				lastFetchTime: 0
				send: (heartbeat, force) =>
					if force or not @poll.busy
						@poll.busy = true
						if heartbeat
							freq = new smio.FetchRequestMessage()
						else
							freq = @poll.msg.next
							@poll.msg.next = @newFetchRequest()
							if not (@poll.intervals.heartbeat.val or @poll.intervals.fetch.val)
								freq.settings ["interval_heartbeat", "interval_fetch"]
							freq.ticks @poll.lastFetchTime
							@poll.msg.last = freq
						($.post "/_/poll/#{if heartbeat then 'p' else 'f'}/?t=#{smio.Util.DateTime.ticks()}", (JSON.stringify freq.msg), ((m, t, x) => @onMessage m, t, x), 'text').error (x, t, e) => @onError x, t, e

	clearTimers: () ->
		@setTimer 'heartbeat'
		@setTimer 'fetch'

	connect: ->
		if @socket
			@socket.connect()
		else if @poll
			@poll.send false, true

	newFetchRequest: (msg, funcs) ->
		new smio.FetchRequestMessage msg, smio.Util.Object.mergeDefaults funcs, url: ["/"]

	onError: (xhr, textStatus, error, url) ->
		if not @poll
			alert JSON.stringify xhr
		else
			if xhr and ((xhr.status is 0) and (xhr.readyState is 0)) or ((xhr.readyState is 4) and (xhr.status >= 12001) and (xhr.status <= 12156))
				@onOffline()
			else
				@onOnline()
				if xhr and xhr.responseText
					alert xhr.responseText
				else
					alert "#{textStatus}\n\n#{JSON.stringify error}\n\n#{JSON.stringify xhr}"
			@poll.busy = false

	onOffline: ->
		@offline++
		if @offline is 2
			if not @offlineBlinkIntervalHandle
				@offlineBlinkIntervalHandle = setInterval (=> @toggleOfflineBlink()), 500
			$('#smio_favicon').attr 'href': '/_/file/images/bg.png'
			$('#smio_offline').show()
			if @client.allControls['']
				@client.allControls[''].disable true, true

	onOnline: ->
		if @offline
			@offline = 0
			if @offlineBlinkIntervalHandle
				clearInterval @offlineBlinkIntervalHandle
				@offlineBlinkIntervalHandle = null
			if @client.allControls['']
				@client.allControls[''].disable false, true
			$('#smio_offline').hide()
			$('#smio_favicon').attr 'href': '/_/file/images/smoothio.png'
			if @socket
				@socket.send JSON.stringify @newFetchRequest().msg

	onMessage: (msg, textStatus, xhr) ->
		@onOnline()
		data = null
		if msg is 'smoonocookie'
			@socket.disconnect()
			onSmoothioNoCookie()
			return
		if (not msg) and textStatus and not _.isString textStatus
			data = textStatus
		if msg and (not data) and _.isString msg
			if _.startsWith msg, '{'
				try
					data = JSON.parse msg
				catch err
					if _.isString err
						err =
							message: err
					err.faultyJson = msg
					@onError err
			else
				data = {}
		if data
			fresp = new smio.FetchResponseMessage data
			if (ctls = fresp.controls())
				@client.syncControls ctls
			if (cfg = fresp.settings())
				if @poll
					@poll.intervals.heartbeat.val = cfg.interval_heartbeat
					@poll.intervals.fetch.val = cfg.interval_fetch
					@setTimers()
			if @poll
				@poll.lastFetchTime = fresp.ticks()
		if @poll
			@poll.busy = false

	onSleepy: (sleepy) ->
		if @poll
			@setTimers()

	onSocketClose: ->

	onSocketConnect: ->
		@onOnline()

	onSocketConnectFailed: ->
		@onOffline()

	onSocketConnecting: (type) ->
		@onOffline()

	onSocketDisconnect: ->
		@onOffline()

	onSocketReconnect: ->
		@onOnline()

	onSocketReconnectFailed: ->
		@onOffline()

	onSocketReconnecting: ->
		@onOffline()

	setTimer: (name, fn) ->
		obj = @poll.intervals[name]
		val = if @client.sleepy then (obj.val * @poll.intervals.sleepyFactor) else obj.val
		if obj['handle']
			clearInterval obj.handle
		if fn and val
			obj.handle = setInterval fn, val

	setTimers: ->
		@setTimer 'heartbeat', () => @poll.send true
		@setTimer 'fetch', () => @poll.send false

	toggleOfflineBlink: ->
		blink = $('#smio_offline_blink')
		vis = blink.css 'visibility'
		blink.css visibility: (if vis is 'hidden' then 'visible' else 'hidden')

