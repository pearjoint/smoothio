smio = global.smoothio

class smio.gfx.UniverseSceneNode extends CL3D.SceneNode

	@consts:
		astroDist: 149597870700
		earthRadius: 6378100
		moonDist: 356400000
		moonRadius: 1738140
		sunRadius: 697000000

	constructor: (@engine) ->
		super(@engine)
		@init()
		@addChild(@earth = new smio.gfx.SphereSceneNode(@engine, smio.gfx.UniverseSceneNode.consts.earthRadius, 0, 0, 0))

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	render: (renderer) =>
		renderer.setWorld(@getAbsoluteTransformation())
		@earth.render(renderer)

