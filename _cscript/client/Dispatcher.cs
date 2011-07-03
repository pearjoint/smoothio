smio = global.smoothio

class smio.Dispatcher
	constructor: (@client, isSocketIO, host, secure, port) ->
		@ready = false
		@offline = 1
		@initialFetchDone = false
		@lastFetchTime = 0
		if isSocketIO
			opts = resource: '/_/sockio/', transports: ['websocket'], rememberTransport: false, reconnect: true, connectTimeout: 5000, secure: smio.iif(secure)
			if port
				opts.port = port
			@socket = new io.Socket(host, opts)
			@socket.on 'connect', => @onSocketConnect()
			@socket.on 'connect_failed', => @onSocketConnectFailed()
			@socket.on 'connecting', (type) => @onSocketConnecting(type)
			@socket.on 'close', => @onSocketClose()
			@socket.on 'disconnect', => @onSocketDisconnect()
			@socket.on 'message', (msg) => @onMessage(msg)
			@socket.on 'reconnect', (type, attempts) => @onSocketReconnect(type, attempts)
			@socket.on 'reconnect_failed', => @onSocketReconnectFailed()
			@socket.on 'reconnecting', (delay, attempts) => @onSocketReconnecting(delay, attempts)
		else
			@poll =
				interval:
					val: 0
					handle: null
					sleepyFactor: 4
				send: (freq) =>
					$.post("/_/poll/?t=#{smio.Util.DateTime.ticks()}", JSON.stringify(freq.msg), ((m, t, x) => @onMessage(m, t, x)), 'text').error (x, t, e) => @onError(x, t, e, freq)

	connect: =>
		@ready = true
		$('#smio_offline').attr('title', smio.resources.smoothio.connecting_hint)
		if @socket
			@socket.connect()
		else if @poll
			@poll.send(@message({}, cmd: 's', settings: [['fi', 'bg']]))
			@poll.send(@messageFetch())

	message: (msg, funcs) =>
		new smio.FetchRequestMessage(msg, smio.Util.Object.mergeDefaults(funcs, url: ["/"]))

	messageFetch: () =>
		@message({}, cmd: 'f', ticks: @lastFetchTime)

	onError: (xhr, textStatus, error, freq) =>
		if not @poll
			alert(JSON.stringify(xhr))
		else
			if freq and (cid = freq.ctlID()) and (ctl = @client.allControls[cid])
				ctl.onInvokeResult([{ xhr: xhr, textStatus: textStatus, error: error }])
			if (textStatus is 'timeout') or (error is 'timeout') or (xhr and (((xhr.status is 0) and (xhr.readyState is 0)) or ((xhr.readyState is 4) and (xhr.status >= 12001) and (xhr.status <= 12156))))
				@onOffline(true)
			else
				@onOnline()
				if not ctl
					if xhr and xhr.responseText
						alert(xhr.responseText)
					else
						alert("#{textStatus}\n\n#{JSON.stringify error}\n\n#{JSON.stringify xhr}")

	onOffline: =>
		@offline++
		if @offline is (if @poll then 1 else 2)
			$('#smio_favicon').attr('href': '/_/file/images/bg.png')
			$('#smio_offline').show()

	onOnline: =>
		if @offline
			@offline = 0
			$('#smio_favicon').attr('href': '/_/file/images/smoothio.png')
			$('#smio_offline').hide()
			if @socket
				@send(@messageFetch())

	onMessage: (msg, textStatus, xhr) =>
		@onOnline()
		data = null
		if msg is 'smoonocookie'
			@socket.disconnect()
			onSmoothioNoCookie()
			return
		if (not msg) and textStatus and not _.isString(textStatus)
			data = textStatus
		if msg and (not data) and _.isString(msg)
			if _.startsWith(msg, '{')
				try
					data = JSON.parse(msg)
				catch err
					if _.isString(err)
						err = message: err
					err.faultyJson = msg
					@onError(err)
			else
				data = {}
		if data
			fresp = new smio.FetchResponseMessage(data)
			if (ctls = fresp.controls())
				@lastFetchTime = fresp.ticks()
				@client.syncControls(ctls)
			if (cfg = fresp.settings())
				if @poll and cfg.fi
					@poll.interval.val = smio.Util.Number.tryParse(cfg.fi, 16000, (iv) -> (iv > 100) and (iv < 12000000))
					@setTimer()
				if cfg.bg
					@client.pageBody.css('background-image': "url('#{cfg.bg}')")
			if (cid = fresp.ctlID()) and (ctl = @client.allControls[cid])
				ctl.onInvokeResult(fresp.errors(), fresp.msg, fresp)

	onSleepy: (sleepy) =>
		if @ready and @poll
			@setTimer()

	onSocketClose: =>

	onSocketConnect: =>
		@onOnline()

	onSocketConnectFailed: =>
		@onOffline()

	onSocketConnecting: (type) =>
		@onOffline()

	onSocketDisconnect: =>
		@onOffline()

	onSocketReconnect: =>
		@onOnline()

	onSocketReconnectFailed: =>
		@onOffline()

	onSocketReconnecting: =>
		@onOffline()

	send: (freq) =>
		if @socket
			@socket.send(JSON.stringify(freq.msg))
		else if @poll
			@poll.send(freq)

	setTimer: (fn) =>
		pi = @poll.interval
		if not fn
			fn = => @poll.send(@messageFetch())
		if not pi.val
			pi.val = 5000
		val = if @client.sleepy then (pi.val * pi.sleepyFactor) else pi.val
		if pi['handle']
			clearInterval(pi.handle)
		if fn and val
			pi.handle = setInterval(fn, val)

