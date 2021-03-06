###
Auto-generated from Core/Earth/MainFrame.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Earth_MainFrame extends smio.Control


	renderTemplate: =>
		'div .smio-main':
			id: ''
			'canvas #c3d .smio-canvas3d':
				width: '672'
				height: '420'
				html: ['']
			'div #ctlpanel':
				'div .smio-mapctl .d1':
					'span .tmp0':
						_: ['FPS: ']
					'input #fps .smio-textinput':
						type: 'text'
						value: '0'
					'br .br0':
						html: ['']
					'span .tmp01':
						_: ['ms/d: ']
					'input #drawdur .smio-textinput':
						type: 'text'
						value: '0'
					'br .br01':
						html: ['']
					'input #lowq':
						type: 'checkbox'
						onclick: 'smio.client.onWindowResize()'
					'label':
						for: @id('lowq')
						_: ['LQ']
					'br .br02':
						html: ['']
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
	
	onEverySecond: =>
		durs = @engine.drawTimes
		@engine.drawTimes = []
		document.getElementById('sm_fps').value = "#{durs.length}"
		document.getElementById('sm_drawdur').value = "#{Math.round(smio.Util.Number.average(durs))}"
	
	onSleepy: (sleepy) =>
		if (sleepy)
			@engine.pressedKeys = []
	
	onWindowResize: (w, h) =>
		h = h - @sub('ctlpanel').height()
		q = if document.getElementById('sm_lowq').checked then 2 else 1
		@engine.canvas.width(w).height(h)
		@engine.gl.canvas.width = w / q
		@engine.gl.canvas.height = h / q
		#@engine.universe.camSettings(w / h, CL3D.degToRad(70))
		@engine.updateCanvasSize()
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Earth_MainFrame"

	classNamespace: ->
		"Core_Earth"