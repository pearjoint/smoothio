smio = global.smoothio

class smio.gfx.MeshCube extends smio.gfx.Mesh

	constructor: (@engine) ->
		super(@engine, 0.0, 0.0, -4.0)
		if (false)
			@colors = []
			for i in [0...24]
				@colors.push([Math.random(), Math.random(), Math.random(), 1.0])
		else
			@texCoords = [
				# Front face
				[0.0, 1.0],
				[1.0, 1.0],
				[1.0, 0.0],
				[0.0, 0.0],
				# Back face
				[1.0, 1.0],
				[1.0, 0.0],
				[0.0, 0.0],
				[0.0, 1.0],
				# Top face
				[0.0, 0.0],
				[0.0, 1.0],
				[1.0, 1.0],
				[1.0, 0.0],
				# Bottom face
				[1.0, 0.0],
				[0.0, 0.0],
				[0.0, 1.0],
				[1.0, 1.0],
				# Right face
				[1.0, 1.0],
				[1.0, 0.0],
				[0.0, 0.0],
				[0.0, 1.0],
				# Left face
				[0.0, 1.0],
				[1.0, 1.0],
				[1.0, 0.0],
				[0.0, 0.0]
			]
		@indices = [
			0, 1, 2,      0, 2, 3,    # Front face
			4, 5, 6,      4, 6, 7,    # Back face
			8, 9, 10,     8, 10, 11,  # Top face
			12, 13, 14,   12, 14, 15, # Bottom face
			16, 17, 18,   16, 18, 19, # Right face
			20, 21, 22,   20, 22, 23  # Left face
		]
		@vertices = [[-1.0, -1.0,  1.0], [1.0, -1.0,  1.0], [1.0,  1.0,  1.0], [-1.0,  1.0,  1.0], [-1.0, -1.0, -1.0], [-1.0,  1.0, -1.0], [1.0,  1.0, -1.0], [1.0, -1.0, -1.0], [-1.0,  1.0, -1.0], [-1.0,  1.0,  1.0], [1.0,  1.0,  1.0], [1.0,  1.0, -1.0], [-1.0, -1.0, -1.0], [1.0, -1.0, -1.0], [1.0, -1.0,  1.0], [-1.0, -1.0,  1.0], [1.0, -1.0, -1.0], [1.0,  1.0, -1.0], [1.0,  1.0,  1.0], [1.0, -1.0,  1.0], [-1.0, -1.0, -1.0], [-1.0, -1.0,  1.0], [-1.0,  1.0,  1.0], [-1.0,  1.0, -1.0]]
		@rotDeg = 0
		@rotY = 0

	beforeDraw: (gl, timings) =>
		@rotY = smio.Util.Number.degToRad(@rotDeg += ((45 * timings.dif) / 1000))

	draw: (gl, timings) =>
		gl.drawElements(gl.TRIANGLES, @indices.length, gl.UNSIGNED_SHORT, @bufferIndex)

