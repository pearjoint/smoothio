smio = global.smoothio

class smio.gfx.Engine extends CL3D.CopperLicht

	constructor: (cid) ->
		super(cid, false, 30, false)
		@pressedKeys = []
		if (@canvas = $("##{cid}")) and (@initRenderer())
			@updateCanvasSize()
			@addScene(@scene = new CL3D.Scene())
			@scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 48))
			@scene.getRootSceneNode().addChild(@skyBox = new CL3D.SkyBoxSceneNode())
			@skyBox.getMaterial(5).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/stars.jpg', true)
			@skyBox.getMaterial(4).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skxup.jpg', true)
			@skyBox.getMaterial(0).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skx1.jpg', true)
			@skyBox.getMaterial(2).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skx3.jpg', true)
			@skyBox.getMaterial(1).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skx2.jpg', true)
			@skyBox.getMaterial(3).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skx0.jpg', true)
			@scene.getRootSceneNode().addChild(@universe = new smio.gfx.UniverseSceneNode(@))
			@scene.setActiveCamera(@universe.cam)
			@universe.camSettings(@canvas.prop('width') / @canvas.prop('height'), CL3D.degToRad(45), @getSightDistance(20), 1)

	createVertex: (x, y, z, s, t) ->
		v = new CL3D.Vertex3D(true)
		v.Pos.X = x
		v.Pos.Y = y
		v.Pos.Z = z
		v.TCoords.X = s
		v.TCoords.Y = t
		v

	getSightDistance: (eyeHeight) =>
		Math.sqrt((2 * smio.gfx.UniverseSceneNode.consts.earthRadius * eyeHeight) + (eyeHeight * eyeHeight))

	isKeyPressed: (keyCode) =>
		if not keyCode? then @pressedKeys.length else _.contains(@pressedKeys, keyCode)

	handleKeyDown: (e) =>
		document.title = e.keyCode + ''
		if not _.contains(@pressedKeys, e.keyCode)
			@pressedKeys.push(e.keyCode)
		if (c = String.fromCharCode(e.keyCode)) and (c = c.toUpperCase())
			if c is 'C'
				@universe.camFar = not @universe.camFar
		super(e)

	handleKeyUp: (e) =>
		if _.contains(@pressedKeys, e.keyCode)
			@pressedKeys = _.without(@pressedKeys, e.keyCode)
		super(e)

	handleMouseMove: (e) =>
		@universe.mouseLook = true
		super(e)

	isContextLost: =>
		@getRenderer().getWebGL().isContextLost

	updateCanvasSize: =>
		[width, height] = [@canvas.width(), @canvas.height()]
		@canvasSize = w: width, h: height, w2: (width / 2), w4: (width / 4), h22: (height / 2.2), h15: (height / 1.5)

