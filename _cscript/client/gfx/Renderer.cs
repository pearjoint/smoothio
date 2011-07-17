smio = global.smoothio

class smio.gfx.Renderer extends CL3D.CopperLicht

	constructor: (cid) ->
		super(cid, false, 30, false)
		if (@canvas = $("##{cid}")) and (@initRenderer())
			@addScene(@scene = new CL3D.Scene())
			@scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 48))
			@scene.getRootSceneNode().addChild(@universe = new smio.gfx.UniverseSceneNode(@))
			@cam = new CL3D.CameraSceneNode()
			@cam.setFov(CL3D.degToRad(70))
			@cam.setAspectRatio(@canvas.prop('width') / @canvas.prop('height'))
			@cam.setFarValue((smio.gfx.UniverseSceneNode.consts.astroDist + 1) * 10)
			@cam.setNearValue(1)
			@cam.Pos.X = -8378100
			@cam.Pos.Y = 0
			@animator = new CL3D.AnimatorCameraFPS(@cam, @)
			@cam.addAnimator(@animator)
			@animator.lookAt(new CL3D.Vect3d(0, 0, 0))
			@scene.getRootSceneNode().addChild(@cam)
			@scene.setActiveCamera(@cam)

	createVertex: (x, y, z, s, t) ->
		v = new CL3D.Vertex3D(true)
		v.Pos.X = x
		v.Pos.Y = y
		v.Pos.Z = z
		v.TCoords.X = s
		v.TCoords.Y = t
		v

	isContextLost: =>
		@getRenderer().getWebGL().isContextLost

