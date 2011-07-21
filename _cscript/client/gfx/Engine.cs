smio = global.smoothio

class smio.gfx.Engine #extends CL3D.CopperLicht

	constructor: (@ctl, cid) ->
		@pressedKeys = []
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

	draw: () =>
		if (gl = @gl) and (canvas = gl.canvas)
			gl.viewport(0, 0, @canvasSize.wpx, @canvasSize.hpx)
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
			mat4.perspective(45, @canvasSize.wpx / @canvasSize.hpx, 0.1, 100.0, @pMatrix)
			mat4.identity(@mvMatrix)
			# triangle
			mat4.translate(@mvMatrix, [-1.5, 0.0, -7.0])
			gl.bindBuffer(gl.ARRAY_BUFFER, @triangleVertexPositionBuffer)
			gl.vertexAttribPointer(@shaderProgram.myVertexPositionAttribute, @triangleVertexPositionBuffer.myItemSize, gl.FLOAT, false, 0, 0)
			gl.bindBuffer(gl.ARRAY_BUFFER, @triangleVertexColorBuffer)
			gl.vertexAttribPointer(@shaderProgram.myVertexColorAttribute, @triangleVertexColorBuffer.myItemSize, gl.FLOAT, false, 0, 0)
			@setMatrixUniforms()
			gl.drawArrays(gl.TRIANGLES, 0, @triangleVertexPositionBuffer.myNumItems)
			# square
			mat4.translate(@mvMatrix, [3.0, 0.0, 0.0]) # moveby not moveto
			gl.bindBuffer(gl.ARRAY_BUFFER, @squareVertexPositionBuffer);
			gl.vertexAttribPointer(@shaderProgram.myVertexPositionAttribute, @squareVertexPositionBuffer.myItemSize, gl.FLOAT, false, 0, 0)
			gl.bindBuffer(gl.ARRAY_BUFFER, @squareVertexColorBuffer)
			gl.vertexAttribPointer(@shaderProgram.myVertexColorAttribute, @squareVertexColorBuffer.myItemSize, gl.FLOAT, false, 0, 0)
			@setMatrixUniforms()
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, @squareVertexPositionBuffer.myNumItems)

	initEngine: =>
		[canvas, gl, names] = [@canvEl, null, ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl']]
		@requestAnimFrame = window.requestAnimationFrame or window.webkitRequestAnimationFrame or window.mozRequestAnimationFrame or window.oRequestAnimationFrame or window.msRequestAnimationFrame
		@mvMatrix = mat4.create()
		@pMatrix = mat4.create()
		for name in names
			try
				gl = canvas.getContext(name, alpha: true, depth: true, stencil: true, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: false)
			catch err
			if gl
				break
		if (@gl = gl)
			@initEngineShaders()
			@initEngineBuffers()
			gl.clearColor(0.1, 0.2, 0.3, 1.0)
			gl.enable(gl.DEPTH_TEST)
		gl

	initEngineBuffers: =>
		if (gl = @gl)
			@triangleVertexColorBuffer = gl.createBuffer()
			gl.bindBuffer(gl.ARRAY_BUFFER, @triangleVertexColorBuffer)
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW)
			@triangleVertexColorBuffer.myNumItems = 3
			@triangleVertexColorBuffer.myItemSize = 4

			@triangleVertexPositionBuffer = gl.createBuffer()
			gl.bindBuffer(gl.ARRAY_BUFFER, @triangleVertexPositionBuffer)
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0,1.0,0.0, -1.0,-1.0,0.0, 1.0,-1.0,0.0]), gl.STATIC_DRAW)
			@triangleVertexPositionBuffer.myNumItems = 3
			@triangleVertexPositionBuffer.myItemSize = 3

			@squareVertexColorBuffer = gl.createBuffer()
			gl.bindBuffer(gl.ARRAY_BUFFER, @squareVertexColorBuffer)
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.6, 0.3, 0.9, 1.0]), gl.STATIC_DRAW)
			@squareVertexColorBuffer.myNumItems = 4
			@squareVertexColorBuffer.myItemSize = 4

			@squareVertexPositionBuffer = gl.createBuffer()
			gl.bindBuffer(gl.ARRAY_BUFFER, @squareVertexPositionBuffer)
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0,1.0,0.0, -1.0,1.0,0.0, 1.0,-1.0,0.0, -1.0,-1.0,0.0]), gl.STATIC_DRAW)
			@squareVertexPositionBuffer.myNumItems = 4
			@squareVertexPositionBuffer.myItemSize = 3

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
		getAnimFrame(@play)
		@draw()
		document.title = new Date().getTime()

	setMatrixUniforms: =>
		@gl.uniformMatrix4fv(@shaderProgram.myPMatrixUniform, false, @pMatrix);
		@gl.uniformMatrix4fv(@shaderProgram.myMVMatrixUniform, false, @mvMatrix);

	updateCanvasSize: =>
		[width, height] = [@canvas.width(), @canvas.height()]
		@canvasSize = wpx: @gl.drawingBufferWidth or @gl.canvas.width, hpx: @gl.drawingBufferHeight or @gl.canvas.height, w: width, h: height, w2: (width / 2), w4: (width / 4), h22: (height / 2.2), h15: (height / 1.5)

