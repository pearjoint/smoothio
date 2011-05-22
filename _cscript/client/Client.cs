smio = global.smoothio

class smio.Client

	constructor: ->
		@mainFrame = new smio.Packs_SmoothioCore_CommonControls_mainframe { id: 'sm' }
		@sessionID = ''
		@socket = new smio.Socket @

	init: ->
		@sessionID = $.cookie 'smiosessid'
		$el = $('#smio_body')
		@mainFrame.renderHtml $el
		@mainFrame.onLoad $el
		@socket.connect()
		setInterval (-> $('#smio_body').css "background-image": "url('/_/file/images/bg#{smio.Util.Number.randomInt(4)}.jpg')"), 5000


$(document).ready ->
	smio.client = new smio.Client()
	smio.client.init()

