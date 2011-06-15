
require './shared/Control'
require './Session'
_ = require 'underscore'
node_fs = require 'fs'
node_path = require 'path'
node_uuid = require 'node-uuid'
node_urlq = require 'querystring'
smio = global.smoothio

class smio.RequestContext

	@parseSmioCookie: (cookies, fail) ->
		if _.isString(cookies)
			cookies = smio.Util.Server.parseCookies(cookies)
		parse = -> JSON.parse(node_urlq.unescape(cookies['smoo']))
		if fail
			smioCookie = parse()
		else
			try
				smioCookie = parse()
			catch err
				smioCookie = {}
		smioCookie

	constructor: (@server, @uri, @httpRequest, @httpResponse, @adminDB, @sharedDB, @serverDB) ->
		@inst = @server.inst
		@postData = null
		@smioCookie = smio.RequestContext.parseSmioCookie(@cookies = smio.Util.Server.parseCookies(@httpRequest.headers['cookie']))
		if @httpRequest.method is 'POST'
			@postData = ''
			@httpRequest.on 'end', => @handleRequest()
			@httpRequest.on 'data', (data) => @postData += "#{data}"
		else
			@handleRequest()

	handleRequest: =>
		#date.setTime date.getTime() + (@server.inst.config.session.timeout * 60 * 1000)
		#expires=#{smio.Util.DateTime.addMinutes(smio.Util.Number.tryParseInt(@inst.config.session.timeout, 20)).toGMTString()}
		@inst.lastRequestTime = new Date()
		if not @smioCookie['sessid']
			@smioCookie['sessid'] = node_uuid()
		respHeaders =
			'Set-Cookie': "smoo=#{node_urlq.escape(JSON.stringify(@smioCookie))}; path=/"
		try
			if (hasHandler = ((@uri.pathItems.length) and (@uri.pathItems[0] is '_') and (@uri.pathItems.length >= 2)))
				switch @uri.pathItems[1]
					when "poll"
						respHeaders['Content-Type'] = 'text/plain'
						finish = (data) =>
							@httpResponse.writeHead 200, respHeaders
							@httpResponse.end(JSON.stringify(data))
						if @uri.pathItems[2] is 'f'
							smio.Session.getBySessionID(@server, @smioCookie['sessid']).handleFetch(@, null, finish)
						else
							finish {}
					when "dynfile"
						if (cfgKey = @uri.query['config'])
							if cfgKey is '_res.js'
								respHeaders['Content-Type'] = 'text/javascript'
								if (userlang = @userLanguage()) in smio.resLangs
									@serveFile("_merged/_res.#{userlang}.js", respHeaders)
								else
									@serveFile("_merged/_res.js", respHeaders)
							else if (cfgVal = '' + smio.Util.Object.select(@server.inst.config, cfgKey)) and (fname = @uri.query[cfgVal])
								if (ctype = @uri.query['type'])
									respHeaders['Content-Type'] = ctype
								@serveFile(fname, respHeaders)
						else
							respHeaders['Content-Type'] = 'text/plain'
							@httpResponse.writeHead(404, respHeaders)
							@httpResponse.end("404 File Not Found: #{node_path.join(@server.fileServer.root, fname)} (dynamic file)")
					when "file"
						if @uri.pathItems.length > 2
							@serveFile(@uri.pathItems[2...].join('/'), respHeaders)
						else
							throw new Error("No file path specified")
					else
						throw new Error("Unknown URL handler: '#{@uri.pathItems[1]}'")
			if not hasHandler
				@servePage(respHeaders)
		catch err
			respHeaders['Content-Type'] = 'text/plain'
			@httpResponse.writeHead(500, respHeaders)
			@httpResponse.end("500 Internal Server Error:\n#{@inst.formatError(err)}")

	userLanguage: () =>
		if not @['userLangs']
			@userLangs = []
			# de-de,de;q=0.8,en;q=0.5,en-us;q=0.3
			for lq in "#{@httpRequest.headers['accept-language']}".split ','
				if 0 <= (pos = lq.indexOf ';')
					lq = lq.substr 0, pos
				if 0 <= (pos = lq.indexOf '-')
					lq = lq.substr 0, pos
				if 0 > _.indexOf @userLangs, lq
					@userLangs.push lq
		smio.iif @userLangs.length, @userLangs[0], ''

	serveFile: (filePath, respHeaders) =>
		node_fs.stat (node_path.join @server.fileServer.root, filePath), (err, stat) =>
			if stat and stat.isFile()
				@server.fileServer.serveFile(filePath, 200, respHeaders, @httpRequest, @httpResponse).addListener 'error', (err) =>
					respHeaders['Content-Type'] = 'text/plain'
					@httpResponse.writeHead err.status, smio.Util.Object.mergeDefaults err.headers, respHeaders
					@httpResponse.end JSON.stringify err
			else
				respHeaders['Content-Type'] = 'text/plain'
				@httpResponse.writeHead (smio.iif err, 500, 404), respHeaders
				if err and err['errno'] isnt 2
					@httpResponse.end "500 Internal Server Error:\n#{@inst.formatError err}"
				else
					@httpResponse.end "404 File Not Found: #{node_path.join @server.fileServer.root, filePath}"

	servePage: (respHeaders) =>
		placeholder = "___smiopagecontent___"
		respHeaders['Content-Type'] = 'text/html'
		@httpResponse.writeHead 200, respHeaders
		if not smio.RequestContext.htmlContent
			smio.RequestContext.htmlContent = smio.Util.FileSystem.readTextFile "server/pub/smoothio.html"
		fileContent = smio.RequestContext.htmlContent
		pos = fileContent.indexOf placeholder
		if pos <= 0
			@httpResponse.write fileContent
		else
			@httpResponse.write fileContent.substr 0, pos
			(session = smio.Session.getBySessionID @server, @smioCookie['sessid']).handleFetch @, {}, (data) =>
				ctl = smio.Control.load data['c']['']['_'], null, id: 'sm'
				@httpResponse.write ctl.renderHtml()
				@httpResponse.end fileContent.substr pos + placeholder.length

