smio = global.smoothio

class smio.gfx.Engine #extends CL3D.CopperLicht

	constructor: (@ctl, cid) ->
		@fps = 0
		@lastDrawTime = 0
		@pressedKeys = []
		@matrixStack = []
		@meshes = [new smio.gfx.MeshMerged(@, [new smio.gfx.MeshBillboard3(@), new smio.gfx.MeshBillboard4(@)])]
		if (@canvas = $("##{cid}")) and @canvas.length and (@canvEl = @canvas[0]) and @initEngine() and @requestAnimFrame
			@updateCanvasSize()
			@play()
			return
			@addScene(@scene = new CL3D.Scene())
			@scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 48))
			@scene.getRootSceneNode().addChild(@skyBox = new CL3D.SkyBoxSceneNode())
			@skyBox.getMaterial(5).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/stars.jpg', true)
			@skyBox.getMaterial(4).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skxup.jpg', true)
			@skyBox.getMaterial(0).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skx1.jpg', true)
			@skyBox.getMaterial(2).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skx3.jpg', true)
			@skyBox.getMaterial(1).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skx2.jpg', true)
			@skyBox.getMaterial(3).Tex1 = @getTextureManager().getTexture('/_/file/images/textures/skx0.jpg', true)
			@scene.getRootSceneNode().addChild(@universe = new smio.gfx.UniverseSceneNode(@))
			@scene.setActiveCamera(@universe.cam)
			@universe.camSettings(@canvEl.width / @canvEl.height, CL3D.degToRad(45), @getSightDistance(20), 1)

	createFragmentShader: (src) =>
		@createShader(@gl.FRAGMENT_SHADER, src)

	createVertexShader: (src) =>
		@createShader(@gl.VERTEX_SHADER, src)

	createShader: (type, src) =>
		if gl = @gl
			shader = gl.createShader(type)
			gl.shaderSource(shader, src)
			gl.compileShader(shader)
			if not (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
				alert(gl.getShaderInfoLog(shader))
		shader

	createVertex: (x, y, z, s, t) ->
		v = new CL3D.Vertex3D(true)
		v.Pos.X = x
		v.Pos.Y = y
		v.Pos.Z = z
		v.TCoords.X = s
		v.TCoords.Y = t
		v

	draw: (timings) =>
		if (gl = @gl) and (canvas = gl.canvas)
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
			mat4.identity(@modelViewMatrix)
			for mesh in @meshes
				if not mesh.hidden
					@drawMesh(gl, mesh, timings)

	drawMesh: (gl, mesh, timings) =>
		@pushMatrix()
		mesh.beforeDraw(gl, timings)
		mat4.translate(@modelViewMatrix, [mesh.posX, mesh.posY, mesh.posZ])
		if mesh.rotX
			mat4.rotateX(@modelViewMatrix, mesh.rotX)
		if mesh.rotY
			mat4.rotateY(@modelViewMatrix, mesh.rotY)
		if mesh.rotZ
			mat4.rotateZ(@modelViewMatrix, mesh.rotZ)
		if mesh.vertexBuffer
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer)
			gl.vertexAttribPointer(@shaderProgram.myVertexPositionAttribute, mesh.vertices[0].length, gl.FLOAT, false, 0, 0)
		if mesh.colorBuffer
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorBuffer)
			gl.vertexAttribPointer(@shaderProgram.myVertexColorAttribute, mesh.colors[0].length, gl.FLOAT, false, 0, 0)
		@setMatrixUniforms()
		mesh.draw(gl, timings)
		@popMatrix()

	initEngine: =>
		[canvas, gl, names] = [@canvEl, null, ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl']]
		@requestAnimFrame = window.requestAnimationFrame or window.webkitRequestAnimationFrame or window.mozRequestAnimationFrame or window.oRequestAnimationFrame or window.msRequestAnimationFrame
		@modelViewMatrix = mat4.create()
		@projectionMatrix = mat4.create()
		for name in names
			try
				gl = canvas.getContext(name, alpha: true, depth: true, stencil: true, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: false)
			if gl
				break
		if (@gl = gl)
			@initEngineShaders()
			@initEngineBuffers()
			gl.clearColor(0.1, 0.2, 0.3, 1.0)
			gl.enable(gl.DEPTH_TEST)
			try
				gl.enable(gl.TEXTURE_2D)
		gl

	initEngineBuffers: =>
		if (gl = @gl)
			for mesh in @meshes
				mesh.updateBuffers()

	initEngineShaders: =>
		if (gl = @gl)
			vertexShader = @createVertexShader(smio.gfx.Shaders.coloredVertexShader)
			fragShader = @createFragmentShader(smio.gfx.Shaders.coloredFragmentShader)
			@shaderProgram = gl.createProgram()
			gl.attachShader(@shaderProgram, vertexShader)
			gl.attachShader(@shaderProgram, fragShader)
			gl.linkProgram(@shaderProgram)
			if not gl.getProgramParameter(@shaderProgram, gl.LINK_STATUS)
				alert('Could not link shader program.')
			gl.useProgram(@shaderProgram)
			@shaderProgram.myVertexPositionAttribute = gl.getAttribLocation(@shaderProgram, 'aVertexPosition')
			gl.enableVertexAttribArray(@shaderProgram.myVertexPositionAttribute)
			@shaderProgram.myVertexColorAttribute = gl.getAttribLocation(@shaderProgram, 'aVertexColor')
			gl.enableVertexAttribArray(@shaderProgram.myVertexColorAttribute)
			@shaderProgram.myPMatrixUniform = gl.getUniformLocation(@shaderProgram, 'uPMatrix')
			@shaderProgram.myMVMatrixUniform = gl.getUniformLocation(@shaderProgram, 'uMVMatrix')

	getSightDistance: (eyeHeight) =>
		Math.sqrt((2 * smio.gfx.UniverseSceneNode.consts.earthRadius * eyeHeight) + (eyeHeight * eyeHeight))

	isKeyPressed: (keyCode) =>
		if not keyCode? then @pressedKeys.length else _.contains(@pressedKeys, keyCode)

	handleKeyDown: (e) =>
		if not _.contains(@pressedKeys, e.keyCode)
			@pressedKeys.push(e.keyCode)
		if (c = String.fromCharCode(e.keyCode)) and (c = c.toUpperCase())
			if c is 'C'
				@universe.camFar = not @universe.camFar
		super(e)

	handleKeyUp: (e) =>
		if _.contains(@pressedKeys, e.keyCode)
			@pressedKeys = _.without(@pressedKeys, e.keyCode)
		super(e)

	handleMouseMove: (e) =>
		@universe.mouseLook = true
		super(e)

	isContextLost: =>
		@gl.isContextLost

	play: =>
		getAnimFrame = @requestAnimFrame
		@draw(now: (now = new Date().getTime()), last: @lastDrawTime, dif: (now - @lastDrawTime))
		@fps = @fps + 1
		@lastDrawTime = now
		getAnimFrame(@play)

	popMatrix: =>
		@modelViewMatrix = @matrixStack.pop()

	pushMatrix: =>
		copy = mat4.create()
		mat4.set(@modelViewMatrix, copy)
		@matrixStack.push(copy)

	setMatrixUniforms: =>
		@gl.uniformMatrix4fv(@shaderProgram.myPMatrixUniform, false, @projectionMatrix);
		@gl.uniformMatrix4fv(@shaderProgram.myMVMatrixUniform, false, @modelViewMatrix);

	updateCanvasSize: =>
		[width, height] = [@canvas.width(), @canvas.height()]
		@canvasSize = wpx: @gl.drawingBufferWidth or @gl.canvas.width, hpx: @gl.drawingBufferHeight or @gl.canvas.height, w: width, h: height, w2: (width / 2), w4: (width / 4), h22: (height / 2.2), h15: (height / 1.5)
		@gl.viewport(0, 0, @canvasSize.wpx, @canvasSize.hpx)
		mat4.perspective(45, @canvasSize.wpx / @canvasSize.hpx, 0.1, 100.0, @projectionMatrix)

