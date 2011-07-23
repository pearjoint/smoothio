smio = global.smoothio

class smio.gfx.MeshBillboard3 extends smio.gfx.Mesh

	constructor: (@engine) ->
		super(@engine, 1.5, 0.0, -6.0)
		@colors = [[1.0, 0.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 1.0]]
		@vertices = [[0.0,1.0,0.0], [-1.0,-1.0,0.0], [1.0,-1.0,0.0]]
		@rotDeg = 0
		@rotX = 0

	beforeDraw: (gl, timings) =>
		@rotX = smio.Util.Number.degToRad(@rotDeg -= ((135 * timings.dif) / 1000))

	draw: (gl, timings) =>
		gl.drawArrays(gl.TRIANGLES, @bufferIndex, @vertices.length)

