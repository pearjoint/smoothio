smio = global.smoothio

class smio.gfx.Renderer extends CL3D.CopperLicht

	constructor: (cid) ->
		super(cid, false, 30, false)
		@pressedKeys = []
		if (@canvas = $("##{cid}")) and (@initRenderer())
			@addScene(@scene = new CL3D.Scene())
			@scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 48))
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

	handleKeyDown: (e) =>
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
		#document.title = "#{e.clientX} / #{e.clientY}"
		super(e)

	isContextLost: =>
		@getRenderer().getWebGL().isContextLost

