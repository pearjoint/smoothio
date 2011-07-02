smio = global.smoothio

class smio.Client

	constructor: ->
		@sleepy = false
		@allControls = {}
		@controlClings = {}
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
		@recalcing = false

	init: =>
		$.ajaxSetup(timeout: 10000)
		$('#smio_offline_msg').text(smio.resources.smoothio.connecting)
		@socket.connect()
		setInterval(@onEverySecond, 750)

	onEverySecond: =>
		if not @recalcing
			@recalcing = true
			for clingerID, clingee of @controlClings
				clinger = @allControls[clingerID]
				if clinger and clingee and clinger.el and clingee.el and (tpos = clingee.el.offset()) and (spos = clinger.el.offset())
					gpos = top: tpos.top + clingee.el.outerHeight() - 6, left: tpos.left
					gw = clingee.el.outerWidth() + 40
					sw = clinger.el.outerWidth()
					if (gpos.left isnt spos.left) or (gpos.top isnt spos.top) or (gw isnt sw)
						clinger.el.css(top: gpos.top, left: gpos.left, width: gw + 'px')
					smio.Control.setClingerOpacity(clinger, clingee)
			@recalcing = false

	onWindowResize: =>
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

