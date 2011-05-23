smio = global.smoothio

class smio.Client

	constructor: ->
		#@sessionID = ''
		@socket = new smio.Socket @

	init: ->
		#@sessionID = $.cookie 'smiosessid'
		$el = $('#smio_body')
		#@mainFrame.renderHtml $el
		#@mainFrame.onLoad $el
		@socket.connect()
		setInterval (-> $('#smio_body').css "background-image": "url('/_/file/images/bg#{smio.Util.Number.randomInt(4)}.jpg')"), 5000

