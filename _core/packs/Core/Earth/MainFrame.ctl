renderTemplate: =>
	'div .smio-main':
		id: ''
		'canvas #c3d .smio-canvas3d':
			width: '640'
			height: '360'
			html: ['']
		'div #ctlpanel':
			'input #lat':
				type: 'text'
				value: '52.52627'
			'input #long':
				type: 'text'
				value: '13.40722'

onLoad: =>
	super()
	@renderer = new smio.gfx.Renderer(@id('c3d'))
	@onWindowResize(@client.pageWindow.width(), @client.pageWindow.height())

onWindowResize: (w, h) =>
	@renderer.canvas.width(w).height(h - @sub('ctlpanel').height())
	@renderer.cam.setFov(CL3D.degToRad(70))
	@renderer.cam.setAspectRatio(w / h)

