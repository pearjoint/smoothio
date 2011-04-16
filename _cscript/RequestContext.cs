
node_path = require 'path'
smio = global.smoothio

class smio.RequestContext
	constructor: (@server, @uri, @httpRequest, @httpResponse, @adminDB, @sharedDB, @serverDB) ->
		@inst = @server.inst

	handleRequest: ->
		@inst.lastRequestTime = new Date
		if hasHandler = @uri.pathItems.length and @uri.pathItems[0] is '_' and @uri.pathItems.length > 2
			switch @uri.pathItems[1]
				when "file"
					if node_path.existsSync node_path.join @server.fileServer.root, filePath = @uri.pathItems[2...].join('/')
						@server.fileServer.serveFile(filePath, 200, @httpRequest.headers, @httpRequest, @httpResponse).addListener 'error', (err) =>
							@httpResponse.writeHead 500, 'Content-Type': 'text/plain'
							@httpResponse.end JSON.stringify err
					else
						@httpResponse.writeHead 404, 'Content-Type': 'text/plain'
						@httpResponse.end "404 File Not Found: #{node_path.join @server.fileServer.root, filePath}"
				else
					hasHandler = false
		if not hasHandler
			@server.fileServer.serveFile('smoothio.html', 200, @httpRequest.headers, @httpRequest, @httpResponse)

