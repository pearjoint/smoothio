smio = global.smoothio

class smio.gfx.DummyAvatarSceneNode extends CL3D.SceneNode

	constructor: (@engine, name, posx, posy, posz, height = 1.8) ->
		super(@engine)
		@init()
		subHeight = (height - 0.3) / 2
		@addChild(@body = new CL3D.CubeSceneNode(subHeight - 0.025))
		@addChild(@legs = new CL3D.CubeSceneNode(subHeight - 0.025))
		@legs.Pos.Y = subHeight / 2
		@body.Pos.Y = (subHeight / 2) + subHeight
		@body.Rot.Y = 45
		@legs.updateAbsolutePosition()
		@body.updateAbsolutePosition()
		@legs.getMaterial(0).Tex1 = @engine.getTextureManager().getTexture("/_/file/images/textures/#{name}.jpg", true)
		@body.getMaterial(0).Tex1 = @engine.getTextureManager().getTexture("/_/file/images/textures/#{name}.jpg", true)
		@addChild(@head = new smio.gfx.SphereSceneNode(@engine, 0.25, 0, height - 0.15, 0))
		@Pos.X = posx
		@Pos.Y = posy
		@Pos.Z = posz
		@updateAbsolutePosition()

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	render: (renderer) =>
		renderer.setWorld(@getAbsoluteTransformation())
		super(renderer)

	rotate: (deg) =>
		cy = @Rot.Y
		y = cy + deg
		if (y < 0)
			y = 360 + cy
		if (y > 360)
			y = cy - 360
		@Rot.Y = y

