smio = global.smoothio

class smio.gfx.GroundSceneNode extends CL3D.SceneNode

	constructor: (@engine) ->
		super()
		@init()
		width = 495
		halfWidth = height = width / 2
		halfHeight = height / 2
		size = width
		(@mesh = new CL3D.Mesh()).AddMeshBuffer(meshBuf = new CL3D.MeshBuffer())
		meshBuf.Indices = [0, 1, 3, 1, 2, 3]
		meshBuf.Vertices.push(@engine.createVertex(halfWidth, 0, -halfHeight, 0, 0))
		meshBuf.Vertices.push(@engine.createVertex(-halfWidth, 0, -halfHeight, 1, 0))
		meshBuf.Vertices.push(@engine.createVertex(-halfWidth, 0, halfHeight, 1, 1))
		meshBuf.Vertices.push(@engine.createVertex(halfWidth, 0, halfHeight, 0, 1))
		meshBuf.Mat.Tex1 = @engine.getTextureManager().getTexture('/_/file/images/textures/earth.jpg', true)

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	render: (renderer) =>
		renderer.setWorld(@getAbsoluteTransformation())
		renderer.drawMesh(@mesh)

