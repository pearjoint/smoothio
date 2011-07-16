renderTemplate: =>
	'div .smio-main':
		id: ''
		'canvas #c3d .smio-canvas3d':
			width: '480'
			height: '320'
			html: ['']

onLoad: =>
	super()
	@renderer = new smio.gfx.Renderer(@id('c3d'))
	@onWindowResize(@client.pageWindow.width(), @client.pageWindow.height())

onWindowResize: (w, h) =>
	@renderer.canvas.width(w).height(h)
	@renderer.cam.setAspectRatio(w / h)

