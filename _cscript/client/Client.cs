smio = global.smoothio

class smio.Client

	constructor: ->
		@sleepy = false
		@allControls = {}
		@pageWindow = $(window)
		@pageBody = $('#smio_body')
		cookie = $.cookie('smoo')
		@pageUrl = $.url()
		try
			@smioCookie = JSON.parse(cookie)
		catch err
			@smioCookie = null
		if not @smioCookie
			@smioCookie = {}
		@sessionID = @smioCookie['sessid']
		@socket = new smio.Socket(@, false)
		@pageWindow.resize(_.debounce((=> @onWindowResize()), 300))

	init: =>
		$.ajaxSetup(timeout: 4000)
		$('#smio_offline_msg').text(smio.resources.smoothio.connecting)
		@socket.connect()

	onWindowResize: () =>
		[w, h] = [@pageWindow.width(), @pageWindow.height()]
		for id, ctl of @allControls
			ctl.onWindowResize(w, h)

	syncControls: (controlDescs) =>
		if (ctlDesc = controlDescs[''])
			if (ctl = @allControls[''])
				ctl.syncUpdate(ctlDesc)
			else
				@allControls[''] = ctl = new smio['Packs_' + ctlDesc._](@, null, smio.Util.Object.mergeDefaults(ctlDesc, id: 'sm'))
				ctl.init()
				ctl.renderHtml($('#smio_main'))
				ctl.onLoad()
		for id, ctlDesc of controlDescs
			if id and (ctl = @allControls[id])
				ctl.syncUpdate(ctlDesc)

