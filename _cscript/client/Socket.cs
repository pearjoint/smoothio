smio = global.smoothio


class smio.Socket
	constructor: (client, host) ->
		@client = client
		@socket = new io.Socket host, resource: '/_/sockio/', rememberTransport: false, connectTimeout: 2000
		@socket.on 'connect', => @onSocketConnect()
		@socket.on 'connect_failed', => @onSocketConnectFailed()
		@socket.on 'connecting', (type) => @onSocketConnecting type
		@socket.on 'disconnect', => @onSocketDisonnect()
		@socket.on 'message', (msg) => @onSocketMessage msg
		@socket.on 'reconnect', (type, attempts) => @onSocketReconnect type, attempts
		@socket.on 'reconnect_failed', => @onSocketReconnectFailed()
		@socket.on 'reconnecting', (delay, attempts) => @onSocketReconnecting delay, attempts
		@sessionID = ''

	connect: ->
		@socket.connect()

	onSocketConnect: ->
		alert JSON.stringify @socket.transport

	onSocketConnectFailed: ->

	onSocketConnecting: (type) ->

	onSocketDisconnect: ->
		@sessionID = ''

	onSocketMessage: (msg) ->
		@sessionID = @socket.transport.sessionid
		alert msg + '\n' + @sessionID
		#if not @sessionID
		#	@sessionID = msg

	onSocketReconnect: (type, attempts) ->

	onSocketReconnectFailed: ->

	onSocketReconnecting: (delay,attempts) ->


