smio = global.smoothio

class smio.Client

	constructor: ->
		@socket = new smio.Socket @, false
		@sleepy = false
		$('#smio_offline').text smio.resources.smoothio.connect
		cookie = $.cookie 'smoo'
		try
			@smioCookie = JSON.parse cookie
		catch err
			@smioCookie = null
		if not @smioCookie
			@smioCookie = {}
		@sessionID = @smioCookie['sessid']

	init: ->
		@socket.connect()
		setInterval (-> $('#smio_body').css "background-image": "url('/_/file/images/bg#{smio.Util.Number.randomInt(4)}.jpg')"), 5000

