smio = global.smoothio

class smio.gfx.Engine #extends CL3D.CopperLicht

	constructor: (@ctl, cid) ->
		@drawTimes = []
		@lastDrawTime = 0
		@pressedKeys = []
		@matrixStack = []
		@shaders = {}
		@meshes = [new smio.gfx.MeshCube(@)] # new smio.gfx.MeshPyramid(@)
		if (@canvas = $("##{cid}")) and @canvas.length and (@canvEl = @canvas[0]) and @initEngine() and @requestAnimFrame
			@texMan = new smio.gfx.TextureManager(@)
			@texMan.load('stones', '/_/file/images/textures/stones.jpg')
			@texMan.load('wood', '/_/file/images/textures/wood.jpg')
			@texMan.load('sky3', '/_/file/images/textures/sky3.jpg')
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
			for name, shaderProg of @shaders
				gl.uniformMatrix4fv(shaderProg.uniforms.pMatrix, false, @projectionMatrix)
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
			for name, shader of @shaders
				gl.vertexAttribPointer(shader.atts.aVertexPosition, mesh.vertices[0].length, gl.FLOAT, false, 0, 0)
		if mesh.colorBuffer
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorBuffer)
			for name, shader of @shaders
				gl.vertexAttribPointer(shader.atts.aVertexColor, mesh.colors[0].length, gl.FLOAT, false, 0, 0)
		if mesh.texCoordsBuffer
			gl.bindBuffer(gl.ARRAY_BUFFER, mesh.texCoordsBuffer)
			for name, shader of @shaders
				gl.vertexAttribPointer(shader.atts.aTexCoord, mesh.texCoords[0].length, gl.FLOAT, false, 0, 0)
			gl.activeTexture(gl.TEXTURE0)
			gl.bindTexture(gl.TEXTURE_2D, @texMan.textures['sky3'])
			for name, shader of @shaders
				gl.uniform1i(shader.uniforms.uSampler, 0)
		if mesh.indexBuffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer)
		for name, shaderProg of @shaders
			gl.uniformMatrix4fv(shaderProg.uniforms.mvMatrix, false, @modelViewMatrix)
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
			for name, shader of smio.gfx.Shaders
				if not shader.disabled
					vertexShader = @createVertexShader(shader.vertex)
					fragShader = @createFragmentShader(shader.fragment)
					@shaders[name] = prog = gl.createProgram()
					gl.attachShader(prog, vertexShader)
					gl.attachShader(prog, fragShader)
					gl.linkProgram(prog)
					if not gl.getProgramParameter(prog, gl.LINK_STATUS)
						alert('Could not link shader program.')
					gl.useProgram(prog)
					if (not shader.atts) or not shader.atts.length
						shader.atts = ['aVertexPosition']
					else if not _.contains(shader.atts, 'aVertexPosition')
						shader.atts.push('aVertexPosition')
					prog.atts = {}
					prog.uniforms =
						pMatrix: gl.getUniformLocation(prog, 'uPMatrix')
						mvMatrix: gl.getUniformLocation(prog, 'uMVMatrix')
					for uniName in shader.uniforms
						prog.uniforms[uniName] = gl.getUniformLocation(prog, uniName)
					for attName in shader.atts
						gl.enableVertexAttribArray(prog.atts[attName] = gl.getAttribLocation(prog, attName))

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

	play: =>
		getAnimFrame = @requestAnimFrame
		if @gl.isContextLost()
			alert 'context lost'
		timings = now: (now = new Date().getTime()), last: @lastDrawTime, dif: (now - @lastDrawTime)
		@drawTimes.push(timings.dif)
		@draw(timings)
		@lastDrawTime = now
		getAnimFrame(@play)

	popMatrix: =>
		@modelViewMatrix = @matrixStack.pop()

	pushMatrix: =>
		copy = mat4.create()
		mat4.set(@modelViewMatrix, copy)
		@matrixStack.push(copy)

	updateCanvasSize: =>
		[width, height] = [@canvas.width(), @canvas.height()]
		@canvasSize = wpx: @gl.drawingBufferWidth or @gl.canvas.width, hpx: @gl.drawingBufferHeight or @gl.canvas.height, w: width, h: height, w2: (width / 2), w4: (width / 4), h22: (height / 2.2), h15: (height / 1.5)
		document.title = "#{@canvasSize.wpx} x #{@canvasSize.hpx}"
		@gl.viewport(0, 0, @canvasSize.wpx, @canvasSize.hpx)
		mat4.perspective(45, @canvasSize.wpx / @canvasSize.hpx, 0.1, 100.0, @projectionMatrix)

