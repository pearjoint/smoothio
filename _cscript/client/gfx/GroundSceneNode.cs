smio = global.smoothio

class smio.gfx.GroundSceneNode extends CL3D.SceneNode

	constructor: (@engine) ->
		super()
		@init()
		size = 4096
		(@mesh = new CL3D.Mesh()).AddMeshBuffer(meshBuf = new CL3D.MeshBuffer())
		meshBuf.Indices = [3, 1, 2, 0, 1, 3]
		meshBuf.Vertices.push(@engine.createVertex(size, 0, -size, 0, 0))
		meshBuf.Vertices.push(@engine.createVertex(-size, 0, -size, 1, 0))
		meshBuf.Vertices.push(@engine.createVertex(-size, 0, size, 1, 1))
		meshBuf.Vertices.push(@engine.createVertex(size, 0, size, 0, 1))
		meshBuf.Mat.Tex1 = @engine.getTextureManager().getTexture('/_/file/images/bg3.jpg', true)

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	render: (renderer) =>
		renderer.setWorld(@getAbsoluteTransformation())
		renderer.drawMesh(@mesh)

