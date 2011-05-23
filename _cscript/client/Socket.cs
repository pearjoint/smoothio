smio = global.smoothio

class smio.Socket
	constructor: (@client, host) ->
		@sessionID = ''
		@socket = new io.Socket host, resource: '/_/sockio/', rememberTransport: false, connectTimeout: 5000
		@socket.on 'connect', => @onSocketConnect()
		@socket.on 'connect_failed', => @onSocketConnectFailed()
		@socket.on 'connecting', (type) => @onSocketConnecting type
		@socket.on 'close', => @onSocketClose()
		@socket.on 'disconnect', => @onSocketDisonnect()
		@socket.on 'message', (msg) => @onSocketMessage msg
		@socket.on 'reconnect', (type, attempts) => @onSocketReconnect type, attempts
		@socket.on 'reconnect_failed', => @onSocketReconnectFailed()
		@socket.on 'reconnecting', (delay, attempts) => @onSocketReconnecting delay, attempts

	connect: ->
		@socket.connect()

	onSocketClose: ->
		$('#smio_log').append "<div>Closed</div>"

	onSocketConnect: ->
		$('#smio_log').append "<div>Connected</div>"
		if (not @sessionID) and @socket.transport['sessionid']
			@sessionID = @socket.transport.sessionid

	onSocketConnectFailed: ->
		$('#smio_log').append "<div>Connect failed</div>"
		@sessionID = ''

	onSocketConnecting: (type) ->
		$('#smio_log').append "<div>Connecting [#{type}]</div>"
		@sessionID = ''

	onSocketDisconnect: ->
		$('#smio_log').append "<div>Disconnected</div>"
		@sessionID = ''

	onSocketMessage: (msg) ->
		$('#smio_log').append "<div>Message: #{msg}</div>"
		if (not @sessionID) and @socket.transport['sessionid']
			@sessionID = @socket.transport.sessionid

	onSocketReconnect: (type, attempts) ->
		$('#smio_log').append "<div>Reconnected: #{type} after #{attempts} attempts</div>"
		if (not @sessionID) and @socket.transport['sessionid']
			@sessionID = @socket.transport.sessionid

	onSocketReconnectFailed: ->
		$('#smio_log').append "<div>Reconnect failed</div>"
		@sessionID = ''

	onSocketReconnecting: (delay,attempts) ->
		$('#smio_log').append "<div>Reconnecting in #{delay} ms, #{attempts} attempts</div>"
		@sessionID = ''

