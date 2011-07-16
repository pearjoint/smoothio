renderTemplate: =>
	'div .smio-main':
		id: ''
		'canvas #c3d .smio-canvas3d':
			html: ['']

onLoad: =>
	super()
	new smio.gfx.Renderer(@id('c3d'))

