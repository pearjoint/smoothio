
smio = global.smoothio

class smio.SocketSession
	@all: {}

	@getBySessionID: (server, sessionID) ->
		sess = null
		if sessionID
			if not (sess = @all[sessionID])
				@all[sessionID] = sess = new smio.SocketSession server, sessionID, server.socket
		sess

	@getBySocketClient: (inst, client) ->
		cookies = inst.util.inst.parseCookies client['listener']?['request']?['headers']?['cookie']
		smio.SocketSession.getBySessionID cookies['smiosessid']

	constructor: (@server, @sessionID, @socket) ->

