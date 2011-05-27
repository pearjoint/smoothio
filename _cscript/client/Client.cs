smio = global.smoothio

class smio.Client

	constructor: ->
		@sleepy = false
		@allControls = {}
		@pageBody = $('#smio_body')
		$('#smio_offline').text smio.resources.smoothio.connect
		cookie = $.cookie 'smoo'
		try
			@smioCookie = JSON.parse cookie
		catch err
			@smioCookie = null
		if not @smioCookie
			@smioCookie = {}
		@sessionID = @smioCookie['sessid']
		@socket = new smio.Socket @, false

	init: ->
		@socket.connect()
		setInterval (=> @pageBody.css "background-image": "url('/_/file/images/bg#{smio.Util.Number.randomInt(4)}.jpg')"), 5000

	syncControls: (controlDescs) ->
		if (ctlDesc = controlDescs[''])
			if (ctl = @allControls[''])
				ctl.syncUpdate ctlDesc
			else
				@allControls[''] = ctl = new smio['Packs_' + ctlDesc._] @, smio.Util.Object.mergeDefaults ctlDesc, id: 'sm'
				ctl.init()
				ctl.renderHtml @pageBody
				ctl.onLoad()
		for id, ctlDesc of controlDescs
			if id and (ctl = @allControls[id])
				ctl.syncUpdate ctlDesc

