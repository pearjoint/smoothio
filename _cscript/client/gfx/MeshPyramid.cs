smio = global.smoothio

class smio.gfx.MeshPyramid extends smio.gfx.Mesh

	constructor: (@engine) ->
		super(@engine, 1, 0.0, -6.0)
		@colors = [[Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0]]
		@vertices = [
			# Front face
			[0.0,  1.0,  0.0],
			[-1.0, -1.0,  1.0],
			[1.0, -1.0,  1.0],
			# Right face
			[0.0,  1.0,  0.0],
			[1.0, -1.0,  1.0],
			[1.0, -1.0, -1.0],
			# Back face
			[0.0,  1.0,  0.0],
			[1.0, -1.0, -1.0],
			[-1.0, -1.0, -1.0],
			# Left face
			[0.0,  1.0,  0.0],
			[-1.0, -1.0, -1.0],
			[-1.0, -1.0,  1.0]
		]
		@rotDeg = 0
		@rotX = 0

	beforeDraw: (gl, timings) =>
		@rotZ = @rotY = @rotX = smio.Util.Number.degToRad(@rotDeg -= ((135 * timings.dif) / 1000))

	draw: (gl, timings) =>
		gl.drawArrays(gl.TRIANGLES, @bufferIndex, @vertices.length)

