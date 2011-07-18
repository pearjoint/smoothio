smio = global.smoothio

class smio.gfx.SphereSceneNode extends CL3D.SceneNode

	constructor: (@engine, radius = 20, posx = 0, posy = 0, posz = 0) ->
		super(@engine)
		@init()
		(@mesh = new CL3D.Mesh()).AddMeshBuffer(meshbuf = new CL3D.MeshBuffer())
		[lats, lons, indices, verts, pi] = [12, 24, [], [], Math.PI]
		for lat in [0..lats]
			theta = lat * pi / lats
			sinTheta = Math.sin(theta)
			cosTheta = Math.cos(theta)
			for lon in [0..lons]
				phi = lon * 2 * pi / lons
				sinPhi = Math.sin(phi)
				cosPhi = Math.cos(phi)
				x = cosPhi * sinTheta
				y = cosTheta
				z = sinPhi * sinTheta
				u = 1 - (lon / lons)
				v = lat / lats
				vertex = @engine.createVertex(radius * x, radius * y, radius * z, 1-u, v)
				vertex.Normal.X = x
				vertex.Normal.Y = y
				vertex.Normal.Z = z
				verts.push(vertex)
		for lat in [0...lats]
			for lon in [0...lons]
				first = (lat * (lons + 1)) + lon
				second = first + lons + 1

				indices.push(first + 1)
				indices.push(second)
				indices.push(first)

				indices.push(first + 1)
				indices.push(second + 1)
				indices.push(second)
		meshbuf.Indices = indices
		for vert in verts
			meshbuf.Vertices.push(vert)
		meshbuf.Mat.Tex1 = @engine.getTextureManager().getTexture('/_/file/images/bg0.jpg', true)
		@Pos.X = posx
		@Pos.Y = posy
		@Pos.Z = posz
		@updateAbsolutePosition()

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	render: (renderer) =>
		renderer.setWorld(@getAbsoluteTransformation())
		renderer.drawMesh(@mesh)

