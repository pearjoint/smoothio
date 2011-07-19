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
				'span .tmp1':
					_: ['Lon/X: ']
				'input #lon .smio-textinput':
					type: 'text'
					value: '13.40722'
				'span .tmp2':
					_: ['Lat/Y: ']
				'input #lat .smio-textinput':
					type: 'text'
					value: '52.5260'
				'LinkButton #l2x':
					labelRawText: ' [LonLat2xy] '
					onClick: =>
						p = x: parseFloat(@sub('lon').val()), y: parseFloat(@sub('lat').val())
						alert JSON.stringify Proj4js.transform(smio.Util.Geo.wgs, smio.Util.Geo.epsg, p)
				'LinkButton #x2l':
					labelRawText: ' [xy2LonLat] '
					onClick: =>
						p = x: parseFloat(@sub('lon').val()), y: parseFloat(@sub('lat').val())
						alert JSON.stringify Proj4js.transform(smio.Util.Geo.epsg, smio.Util.Geo.wgs, p)
	
	onLoad: =>
		super()
		@engine = new smio.gfx.Engine(@id('c3d'))
		@onWindowResize(@client.pageWindow.width(), @client.pageWindow.height())
	
	onSleepy: (sleepy) =>
		if (sleepy)
			@engine.pressedKeys = []
	
	onWindowResize: (w, h) =>
		@engine.canvas.width(w).height(h - @sub('ctlpanel').height())
		@engine.canvas.prop('width', w / 2).prop('height', (h - @sub('ctlpanel').height()) / 2)
		@engine.universe.camSettings(w / h, CL3D.degToRad(70))
		@engine.updateCanvasSize()
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Earth_MainFrame"

	classNamespace: ->
		"Core_Earth"