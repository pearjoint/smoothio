smio = global.smoothio

class smio.gfx.SceneNode extends CL3D.SceneNode

	constructor: (@engine) ->
		super(@engine)
		@init()
		(@mesh = new CL3D.Mesh()).AddMeshBuffer(buf = new CL3D.MeshBuffer())
		buf.Indices = [0,2,3, 2,1,3, 1,0,3, 2,0,1]
		buf.Vertices.push(@createVertex(0, 0, 10, 0, 0))
		buf.Vertices.push(@createVertex(10, 0, -10, 1, 0))
		buf.Vertices.push(@createVertex(0, 20, 0, 0, 1))
		buf.Vertices.push(@createVertex(-10, 20, -10, 1, 1))
		buf.Mat.Tex1 = @engine.getTextureManager().getTexture('/_/file/images/bg0.jpg', true)

	createVertex: (x, y, z, s, t) ->
		v = new CL3D.Vertex3D(true)
		v.Pos.X = x
		v.Pos.Y = y
		v.Pos.Z = z
		v.TCoords.X = s
		v.TCoords.Y = t
		v

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	render: (renderer) =>
		renderer.setWorld(@getAbsoluteTransformation())
		renderer.drawMesh(@mesh)

