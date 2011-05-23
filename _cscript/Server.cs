
require './RequestContext'
require './SocketSession'
node_http = require 'http'
node_multi = require 'multi-node'
node_os = require 'os'
node_static = require 'node-static'
node_url = require 'url'
node_util = require 'util'
socketio = require 'socket.io'
smio = global.smoothio

class smio.Server
	constructor: (@inst, @serverName, @hostName, @port, @processes) ->
		hostName = @hostName
		localHostName = node_os.hostname()
		if @inst.config.smoothio.dns_preresolve.enabled or process.platform is 'cygwin'
			for host, ip of @inst.config.smoothio.dns_preresolve.hostnames
				if (hostName is host) or ((host is '$localhostname') and hostName is localHostName)
					hostName = ip
					break
		@sockLogFile = null
		@status = 0
		@isHttps = false
		@httpServer = node_http.createServer (request, response) => @onRequest request, response
		@fileServer = new node_static.Server 'server/pub/'
		@httpServer.on 'error', (err) => @onError err
		@httpServer.on 'close', => @status = -1
		if @processes <= 1
			@httpServer.listen @port, hostName, => @onBind()
		else
			node_multi.listen { "port": @port, "nodes": @processes }, @httpServer
		@sockLogFile = null
		if sockLogPath = @inst.expandLogPath @inst.config.sockets.logpath
			sockLogger = smio.Util.Server.setupLogFile @, 'sockLogFile', false, sockLogPath, (msg) -> msg
		else
			sockLogger = () ->
		@socket = socketio.listen @httpServer, resource: '/_/sockio/', flashPolicyServer: false, log: sockLogger
		@socket.on 'clientConnect', (client) => @onSocketConnect client
		@socket.on 'clientDisconnect', (client) => @onSocketDisconnect client
		@socket.on 'clientMessage', (msg, client) => @onSocketMessage msg, client

	onBind: ->
		@status = 1
		smio.logit (@inst.r 'log_server_listening', @serverName, @hostName, @port), 'servers.' + @serverName

	onError: (err) ->
		smio.logit (@inst.r 'log_server_error_start', @serverName, @inst.formatError err), 'servers.' + @serverName

	onRequest: (request, response) ->
		@status = 1
		url = request.url
		if url.indexOf 'http://' isnt 0 and url.indexOf 'https://' isnt 0
			url = "#{if @isHttps then 'http' else 'https'}://#{@hostName}:#{@port}#{url}"
		uri = node_url.parse url, true
		uri.pathItems = (pathItem for pathItem in uri.pathname.split('/') when pathItem and pathItem.length)
		if uri.pathItems.length is 1
			if uri.pathItems[0] is 'robots.txt'
				uri.pathItems = ['_', 'file', 'robots.txt']
			if uri.pathItems[0].indexOf 'favicon' is 0 
				uri.pathItems = ['_', 'file', uri.pathItems[0]]
		uri.rawUrl = request.url
		uri.url = url
		ctx = new smio.RequestContext @, uri, request, response, @inst.mongos['admin'], @inst.mongos['smoothio_shared'], @inst.mongos["smoothio__#{@serverName}"]
		ctx.handleRequest()

	onSocketConnect: (client) ->
		if (sess = smio.SocketSession.getBySocketClient @, client)
			client.send sess.sessionID
			sess.onInit()
		else
			client.send JSON.stringify "errors": ["YO session could not be obtained or created."]

	onSocketDisconnect: (client) ->
		if (sess = smio.SocketSession.all[client.sessionId])
			sess.onEnd()
			smio.SocketSession.all[client.sessionId] = null
			delete smio.SocketSession.all[client.sessionId]

	onSocketMessage: (message, client) ->
		if (sess = smio.SocketSession.getBySocketClient @, client)
			sess.onMessage message
		else
			client.send JSON.stringify "errors": ["Your session could not be obtained or created."]

	stop: ->
		@status = 0
		try
			@httpServer.close()
		catch err
			@status = -1

