
require './RequestContext'
require './Session'
node_http = require 'http'
node_multi = require 'multi-node'
node_os = require 'os'
node_static = require 'node-static'
node_url = require 'url'
node_util = require 'util'
socketio = require 'socket.io'
smio = global.smoothio

class smio.Server
	@sockSessions: {}

	tryrequire: (name) -> try require(name)

	constructor: (@inst, @serverName, @hostName, @port, @processes) ->
		hostName = @hostName
		localHostName = node_os.hostname()
		if @inst.config.smoothio.dns_preresolve.enabled or (process.platform is 'cygwin')
			for host, ip of @inst.config.smoothio.dns_preresolve.hostnames
				if (hostName is host) or ((host is '$localhostname') and hostName is localHostName)
					hostName = ip
					break
		@sockLogFile = null
		@status = 0
		@isHttps = false
		@httpServer = node_http.createServer (request, response) => @onRequest(request, response)
		@fileServer = new node_static.Server('server/pub/')
		@httpServer.on 'error', (err) => @onError(err)
		@httpServer.on 'close', =>
			smio.logit(@inst.r('log_server_closed'), 'servers.' + @serverName)
			@status = -1
		if @processes <= 1
			@httpServer.listen(@port, hostName, => @onBind())
		else
			node_multi.listen({port: @port, nodes: @processes }, @httpServer)
		@sockLogFile = null
		if sockLogPath = @inst.expandLogPath(@inst.config.sockets.logpath)
			sockLogger = smio.Util.Server.setupLogFile(@, 'sockLogFile', false, sockLogPath, (msg) -> msg)
		else
			sockLogger = ->
		if (@io = socketio.listen(@httpServer))
			@io.configure '', =>
				@io.set('resource', '/_/sockio/')
				@io.set('transports', ['websocket'])
				@io.disable('flash policy server')
				@io.disable('browser client')
			@io.sockets.on 'connection', (socket) =>
				socket.on 'disconnect', (sock) => @onSocketDisconnect(sock or socket)
				socket.on 'message', (msg, sock) => @onSocketMessage(msg, sock or socket)
				@onSocketConnect(socket)

	getSocketSessionID: (socket) =>
		if not smio.Server.sockSessions[socket.id]
			smio.Server.sockSessions[socket.id] = smio.RequestContext.parseSmioCookie(socket['request']?['headers']?['cookie']).sessid
		smio.Server.sockSessions[socket.id]

	onBind: =>
		@status = 1
		smio.logit(@inst.r('log_server_listening', @serverName, @hostName, @port), 'servers.' + @serverName)

	onError: (err) =>
		smio.logit(@inst.r('log_server_error_start', @serverName, @inst.formatError(err)), 'servers.' + @serverName)

	onRequest: (request, response) =>
		if @status < 0
			response.writeHead(200, 'Content-Type': 'text/plain')
			response.end(JSON.stringify(__foo: 'Shutdown'))
			@stop()
		else
			@status = 1
			url = request.url
			if (url.indexOf('http://') isnt 0) and (url.indexOf('https://') isnt 0)
				url = "#{if @isHttps then 'https' else 'http'}://#{@hostName}:#{@port}#{url}"
			uri = node_url.parse(url, true)
			uri.pathItems = (pathItem for pathItem in uri.pathname.split('/') when pathItem and pathItem.length)
			if uri.pathItems.length is 1
				if uri.pathItems[0] is 'robots.txt'
					uri.pathItems = ['_', 'file', 'robots.txt']
				if (uri.pathItems[0].indexOf 'favicon') is 0
					uri.pathItems = ['_', 'file', uri.pathItems[0]]
			uri.rawUrl = request.url
			uri.url = url
			ctx = new smio.RequestContext(@, uri, request, response, @inst.mongos['admin'], @inst.mongos['smoothio_shared'], @inst.mongos["smoothio__#{@serverName}"])

	onSocketConnect: (socket) =>
		if (sessid = @getSocketSessionID(socket)) and (sess = smio.Session.getBySessionID(@, sessid))
			sess.onInit()
			socket.send(socket.id)
		else
			socket.send("smoonocookie")

	onSocketDisconnect: (socket) =>
		if (sessid = @getSocketSessionID(socket)) and (sess = smio.Session.all[sessid])
			sess.onEnd()
			smio.Session.all[sessid] = null
			delete smio.Session.all[sessid]
		if smio.Server.sockSessions[socket.id]
			smio.Server.sockSessions[socket.id] = null
			delete smio.Server.sockSessions[socket.id]

	onSocketMessage: (message, socket) =>
		if message
			if (sessid = @getSocketSessionID(socket)) and (sess = smio.Session.getBySessionID(@, sessid))
				sess.handleFetch null, message, (data) ->
					socket.send(JSON.stringify(data))
			else
				socket.send("smoonocookie")

	stop: =>
		@status = -2
		try
			smio.logit(@inst.r('log_server_closing'), 'servers.' + @serverName)
			@httpServer.close()
		catch err
			@onError(err)
			@status = -1

