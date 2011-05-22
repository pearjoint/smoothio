smio = global.smoothio

class smio.Socket
	constructor: (@client, host) ->
		@sessionID = ''
		@socket = new io.Socket host, resource: '/_/sockio/', rememberTransport: false, connectTimeout: 2000
		@socket.on 'connect', => @onSocketConnect()
		@socket.on 'connect_failed', => @onSocketConnectFailed()
		@socket.on 'connecting', (type) => @onSocketConnecting type
		@socket.on 'disconnect', => @onSocketDisonnect()
		@socket.on 'message', (msg) => @onSocketMessage msg
		@socket.on 'reconnect', (type, attempts) => @onSocketReconnect type, attempts
		@socket.on 'reconnect_failed', => @onSocketReconnectFailed()
		@socket.on 'reconnecting', (delay, attempts) => @onSocketReconnecting delay, attempts

	connect: ->
		@socket.connect()

	onSocketConnect: ->
		if (not @sessionID) and @socket.transport['sessionid']
			@sessionID = @socket.transport.sessionid

	onSocketConnectFailed: ->
		@sessionID = ''

	onSocketConnecting: (type) ->
		@sessionID = ''

	onSocketDisconnect: ->
		@sessionID = ''

	onSocketMessage: (msg) ->
		if (not @sessionID) and @socket.transport['sessionid']
			@sessionID = @socket.transport.sessionid

	onSocketReconnect: (type, attempts) ->
		if (not @sessionID) and @socket.transport['sessionid']
			@sessionID = @socket.transport.sessionid

	onSocketReconnectFailed: ->
		@sessionID = ''

	onSocketReconnecting: (delay,attempts) ->
		@sessionID = ''

