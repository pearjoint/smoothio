smio = global.smoothio

class smio.gfx.GroundSceneNode extends CL3D.SceneNode

	constructor: (@engine) ->
		super()
		@init()
		# 40075016.68
		@mapWidth = 495
		@mapWidthHalf = @mapHeight = @mapWidth / 2
		@mapHeightHalf = @mapHeight / 2
		(@mesh = new CL3D.Mesh()).AddMeshBuffer(meshBuf = new CL3D.MeshBuffer())
		meshBuf.Indices = [0, 1, 3, 1, 2, 3]
		meshBuf.Vertices.push(@engine.createVertex(@mapWidthHalf, 0, -@mapHeightHalf, 0, 0))
		meshBuf.Vertices.push(@engine.createVertex(-@mapWidthHalf, 0, -@mapHeightHalf, 1, 0))
		meshBuf.Vertices.push(@engine.createVertex(-@mapWidthHalf, 0, @mapHeightHalf, 1, 1))
		meshBuf.Vertices.push(@engine.createVertex(@mapWidthHalf, 0, @mapHeightHalf, 0, 1))
		meshBuf.Mat.Tex1 = @engine.getTextureManager().getTexture('/_/file/images/textures/earth.png', true)

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	mapPositionFromLatLong: (lat, lon) =>
		pos = smio.Util.Geo.mercator(lat, lon, @mapWidth, @mapHeight)
		document.title = JSON.stringify pos
		pos.x = @mapWidthHalf - pos.x
		pos.y = pos.y - @mapHeightHalf
		pos

	mapPositionToLatLong: (x, z) =>
		lat: 0, lon: 0

	render: (renderer) =>
		renderer.setWorld(@getAbsoluteTransformation())
		renderer.drawMesh(@mesh)

