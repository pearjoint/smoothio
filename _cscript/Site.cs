
node_url = require 'url'

smio = global.smoothio

class smio.Site
	constructor: (@session, @url, @rc) ->
		@server = @session.server
		@inst = @server.inst
		if not @url
			@url = '/'
		@uri = node_url.parse @url

	getControlUpdates: (sinceTicks) ->
		{ "": "SmoothioCore_CommonControls_mainframe" }

