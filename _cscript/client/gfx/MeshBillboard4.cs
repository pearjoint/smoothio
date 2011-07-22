smio = global.smoothio

class smio.gfx.MeshBillboard4 extends smio.gfx.Mesh

	constructor: (@engine) ->
		super(@engine, -1.5, 0.0, -1.0)
		@colors = [[1.0, 1.0, 0.0, 1.0], [0.0, 1.0, 1.0, 1.0], [1.0, 0.0, 1.0, 1.0], [0.6, 0.3, 0.9, 1.0]]
		@vertices = [[1.0,1.0,0.0], [-1.0,1.0,0.0], [1.0,-1.0,0.0], [-1.0,-1.0,0.0]]
		@rotDeg = 0
		@rotY = 0

	beforeDraw: (gl, timings) =>
		@rotY = smio.Util.Number.degToRad(@rotDeg += ((270 * timings.dif) / 1000))

	draw: (gl, timings) =>
		gl.drawArrays(gl.TRIANGLE_STRIP, @bufferIndex, @vertices.length)

