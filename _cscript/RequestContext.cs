
node_path = require 'path'
node_uuid = require 'node-uuid'
smio = global.smoothio

class smio.RequestContext
	constructor: (@server, @uri, @httpRequest, @httpResponse, @adminDB, @sharedDB, @serverDB) ->
		@inst = @server.inst
		@cookies = smio.Util.Server.parseCookies @httpRequest.headers['cookie']

	handleRequest: ->
		@inst.lastRequestTime = new Date
		if not @cookies['smiosessid']
			date = new Date()
			date.setTime date.getTime() + (@server.inst.config.session.timeout * 60 * 1000)
			@cookies['smiosessid'] = node_uuid()
		respHeaders =
			'Set-Cookie': (((k + '=' + v) for k, v of @cookies).join ';') + "; expires=#{smio.Util.DateTime.addMinutes(smio.Util.Number.tryParseInt(@inst.config.session.timeout, 20)).toGMTString()}; path=/"
		if hasHandler = @uri.pathItems.length and @uri.pathItems[0] is '_' and @uri.pathItems.length > 2
			switch @uri.pathItems[1]
				when "dynfile"
					if (cfgKey = @uri.query['config']) and (cfgVal = @server.inst.config[cfgKey]) and (fname = @uri.query[cfgVal + ''])
						@serveFile fname, respHeaders
					else
						respHeaders['Content-Type'] = 'text/plain'
						@httpResponse.writeHead 404, respHeaders
						@httpResponse.end "404 File Not Found: #{node_path.join @server.fileServer.root, filePath}"
				when "file"
					@serveFile (@uri.pathItems[2...].join '/'), respHeaders
				else
					hasHandler = false
		if not hasHandler
			@serveFile 'smoothio.html', respHeaders

	serveFile: (filePath, respHeaders) ->
		if node_path.existsSync node_path.join @server.fileServer.root, filePath
			@server.fileServer.serveFile(filePath, 200, respHeaders, @httpRequest, @httpResponse).addListener 'error', (err) =>
				respHeaders['Content-Type'] = 'text/plain'
				@httpResponse.writeHead err.status, smio.Util.Server.mergeConfigWithDefaults err.headers, respHeaders
				@httpResponse.end JSON.stringify err
		else
			respHeaders['Content-Type'] = 'text/plain'
			@httpResponse.writeHead 404, respHeaders
			@httpResponse.end "404 File Not Found: #{node_path.join @server.fileServer.root, filePath}"

