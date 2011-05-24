smio = global.smoothio

class smio.Client

	constructor: ->
		@socket = new smio.Socket @, false
		@sleepy = false
		bod = $ '#smio_body'
		bod.blur () ->
			if not @sleepy
				@socket.onSleepy @sleepy = true
		bod.focus () ->
			if @sleepy
				@socket.sleepy @sleepy false
		cookie = $.cookie 'smoothio'
		try
			@smioCookie = JSON.parse cookie
		catch err
			@smioCookie = {}
		@sessionID = @smioCookie['sessid']

	init: ->
		@socket.connect()
		setInterval (-> $('#smio_body').css "background-image": "url('/_/file/images/bg#{smio.Util.Number.randomInt(4)}.jpg')"), 5000

