smio = global.smoothio

class smio.gfx.SectorTileSceneNode extends CL3D.SceneNode

	constructor: (@engine, @tileNumX, @tileNumY) ->
		super()
		@init()
		#(@mesh = new CL3D.Mesh()).AddMeshBuffer(meshBuf = new CL3D.MeshBuffer())
		#meshBuf.Indices = [0, 1, 3, 1, 2, 3]
		#meshBuf.Vertices.push(@engine.createVertex(@mapWidthHalf, 0, -@mapHeightHalf, 0, 0))
		#meshBuf.Vertices.push(@engine.createVertex(-@mapWidthHalf, 0, -@mapHeightHalf, 1, 0))
		#meshBuf.Vertices.push(@engine.createVertex(-@mapWidthHalf, 0, @mapHeightHalf, 1, 1))
		#meshBuf.Vertices.push(@engine.createVertex(@mapWidthHalf, 0, @mapHeightHalf, 0, 1))
		#meshBuf.Mat.Tex1 = @engine.getTextureManager().getTexture('/_/file/images/textures/earth.png', true)

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	render: (renderer) =>
		renderer.setWorld(@getAbsoluteTransformation())
		#renderer.drawMesh(@mesh)

