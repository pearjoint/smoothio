
smio = global.smoothio

class smio.SocketSession
	@all: {}

	@getBySessionID: (server, sessionID) ->
		sess = null
		if sessionID
			if not (sess = @all[sessionID])
				@all[sessionID] = sess = new smio.SocketSession server, sessionID, server.socket
		sess

	@getBySocketClient: (server, client) ->
		smio.SocketSession.getBySessionID server, client.sessionId

	constructor: (@server, @sessionID, @socket) ->

	onEnd: ->

	onMessage: (msg) ->

