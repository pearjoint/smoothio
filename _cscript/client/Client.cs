smio = global.smoothio

class smio.Client

	constructor: ->
		@sleepy = false
		@allControls = {}
		@controlClings = {}
		@lastFixup = 0
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
		@disp = new smio.Dispatcher(@, false)
		@pageWindow.resize(_.debounce((=> @onWindowResize()), 300))
		@recalcing = false

	doPageFixups: =>
		if (not @recalcing) and ((not @sleepy) or ((new Date().getTime() - @lastFixup) >= 5000))
			@recalcing = true
			$('.smio-dt').each (i, span) =>
				$span = $(span)
				if (dt = smio.Util.Number.tryParse($span.attr('data-dt'), 0))
					$span.text(_date(dt).fromNow())
			for clingerID, clingee of @controlClings
				clinger = @allControls[clingerID]
				if clinger and clingee and clinger.el and clingee.el and (tpos = clingee.el.offset()) and (spos = clinger.el.offset())
					gpos = top: tpos.top + clingee.el.outerHeight() - 6, left: tpos.left
					gw = clingee.el.outerWidth() + 40
					sw = clinger.el.outerWidth()
					if (gpos.left isnt spos.left) or (gpos.top isnt spos.top) or (gw isnt sw)
						clinger.el.css(top: gpos.top, left: gpos.left, width: gw + 'px')
					smio.Control.setClingerOpacity(clinger, clingee)
			@lastFixup = new Date().getTime()
			@recalcing = false

	init: =>
		for k of _date.relativeTime
			if (tl = smio.resources.client["natlangtime_#{k}"])
				_date.relativeTime[k] = tl
		$.ajaxSetup(timeout: 3000)
		$('#smio_offline_msg').text(smio.resources.client.connecting)
		@disp.connect()
		setInterval(@doPageFixups, 750)

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

