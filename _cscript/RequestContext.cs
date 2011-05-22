
node_path = require 'path'
node_uuid = require 'node-uuid'
smio = global.smoothio

class smio.RequestContext
	constructor: (@server, @uri, @httpRequest, @httpResponse, @adminDB, @sharedDB, @serverDB) ->
		@inst = @server.inst
		@cookies = @server.inst.util.inst.parseCookies @httpRequest.headers['cookie']

	handleRequest: ->
		@inst.lastRequestTime = new Date
		if not @cookies['smiosessid']
			@cookies['smiosessid'] = node_uuid()
		respHeaders =
			'Set-Cookie': ((k + '=' + v) for k, v of @cookies).join ';'
		if hasHandler = @uri.pathItems.length and @uri.pathItems[0] is '_' and @uri.pathItems.length > 2
			switch @uri.pathItems[1]
				when "file"
					if node_path.existsSync node_path.join @server.fileServer.root, filePath = @uri.pathItems[2...].join('/')
						@server.fileServer.serveFile(filePath, 200, respHeaders, @httpRequest, @httpResponse).addListener 'error', (err) =>
							respHeaders['Content-Type'] = 'text/plain'
							@httpResponse.writeHead err.status, @server.inst.util.inst.mergeConfigWithDefaults err.headers, respHeaders
							@httpResponse.end JSON.stringify err
					else
						respHeaders['Content-Type'] = 'text/plain'
						@httpResponse.writeHead 404, respHeaders
						@httpResponse.end "404 File Not Found: #{node_path.join @server.fileServer.root, filePath}"
				else
					hasHandler = false
		if not hasHandler
			@server.fileServer.serveFile('smoothio.html', 200, respHeaders, @httpRequest, @httpResponse)

