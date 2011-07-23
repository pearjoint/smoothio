smio = global.smoothio

class smio.gfx.MeshMerged extends smio.gfx.Mesh

	constructor: (@engine, @meshes) ->
		super(@engine, 0.0, 0.0, -7.0)
		last = 0
		@rotDeg = 0
		@rotZ = 0
		for mesh in @meshes
			mesh.bufferIndex = last
			last += mesh.vertices.length

	beforeDraw: (gl, timings) =>
		for mesh in @meshes
			mesh.beforeDraw(gl, timings)
		@rotZ = smio.Util.Number.degToRad(@rotDeg -= ((45 * timings.dif) / 1000))

	draw: (gl, timings) =>
		for mesh in @meshes
			@engine.pushMatrix()
			mat4.translate(@engine.modelViewMatrix, [mesh.posX, mesh.posY, mesh.posZ])
			if mesh.rotX
				mat4.rotateX(@engine.modelViewMatrix, mesh.rotX)
			if mesh.rotY
				mat4.rotateY(@engine.modelViewMatrix, mesh.rotY)
			if mesh.rotZ
				mat4.rotateZ(@engine.modelViewMatrix, mesh.rotZ)
			#@engine.updateShaderModelViewMatrix()
			mesh.draw(gl, timings)
			@engine.popMatrix()

	updateBuffers: (onlyIfCreated) =>
		@colors = []
		@vertices = []
		for mesh in @meshes
			if mesh.colors
				for col in mesh.colors
					@colors.push(col)
			if mesh.vertices
				for vert in mesh.vertices
					@vertices.push(vert)
		super()

