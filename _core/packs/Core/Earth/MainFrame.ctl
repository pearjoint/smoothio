renderTemplate: =>
	'div .smio-main':
		id: ''
		'canvas #c3d .smio-canvas3d':
			width: '672'
			height: '420'
			html: ['']
		'div #ctlpanel':
			'div .smio-mapctl .d1':
				'span .tmp1':
					_: ['Lon/X: ']
				'input #lon .smio-textinput':
					type: 'text'
					value: '13.40722'
				'br .br1':
					html: ['']
				'span .tmp2':
					_: ['Lat/Y: ']
				'input #lat .smio-textinput':
					type: 'text'
					value: '52.5260'
				'br .br2':
					html: ['']
				'LinkButton #l2x':
					labelRawText: ' [Go2LonLat] '
					onClick: =>
						@engine.universe.curFig.goTo(parseFloat(@sub('lon').val()), parseFloat(@sub('lat').val()), true)
				'LinkButton #x2l':
					labelRawText: ' [Go2XZ] '
					onClick: =>
						@engine.universe.curFig.goTo(parseFloat(@sub('lon').val()), parseFloat(@sub('lat').val()))
			'div .smio-mapctl .d2':
				'div .r1':
					'img #map00 .smio-mapsectortile':
						src: '/_/file/images/textures/particle.png'
					'img #map10 .smio-mapsectortile':
						src: '/_/file/images/textures/particle.png'
					'img #map20 .smio-mapsectortile':
						src: '/_/file/images/textures/particle.png'
				'div .r2':
					'img #map01 .smio-mapsectortile':
						src: '/_/file/images/textures/particle.png'
					'img #map11 .smio-mapsectortile':
						src: '/_/file/images/textures/particle.png'
					'img #map21 .smio-mapsectortile':
						src: '/_/file/images/textures/particle.png'
				'div .r3':
					'img #map02 .smio-mapsectortile':
						src: '/_/file/images/textures/particle.png'
					'img #map12 .smio-mapsectortile':
						src: '/_/file/images/textures/particle.png'
					'img #map22 .smio-mapsectortile':
						src: '/_/file/images/textures/particle.png'
			'div .smio-mapctl .d3':
				'img #mapimg .smio-mapsectorbigtile':
					src: '/_/file/images/textures/particle.png'

onLoad: =>
	super()
	@engine = new smio.gfx.Engine(@, @id('c3d'))
	@onWindowResize(@client.pageWindow.width(), @client.pageWindow.height())

onSleepy: (sleepy) =>
	if (sleepy)
		@engine.pressedKeys = []

onWindowResize: (w, h) =>
	@engine.canvas.width(w).height(h - @sub('ctlpanel').height())
	@engine.canvas.prop('width', w / 2).prop('height', (h - @sub('ctlpanel').height()) / 2)
	@engine.universe.camSettings(w / h, CL3D.degToRad(70))
	@engine.updateCanvasSize()

