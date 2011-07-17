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
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Earth_MainFrame"

	classNamespace: ->
		"Core_Earth"