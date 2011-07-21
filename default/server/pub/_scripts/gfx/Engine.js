(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.gfx.Engine = (function() {
    function Engine(ctl, cid) {
      this.ctl = ctl;
      this.updateCanvasSize = __bind(this.updateCanvasSize, this);
      this.setMatrixUniforms = __bind(this.setMatrixUniforms, this);
      this.play = __bind(this.play, this);
      this.isContextLost = __bind(this.isContextLost, this);
      this.handleMouseMove = __bind(this.handleMouseMove, this);
      this.handleKeyUp = __bind(this.handleKeyUp, this);
      this.handleKeyDown = __bind(this.handleKeyDown, this);
      this.isKeyPressed = __bind(this.isKeyPressed, this);
      this.getSightDistance = __bind(this.getSightDistance, this);
      this.initEngineShaders = __bind(this.initEngineShaders, this);
      this.initEngineBuffers = __bind(this.initEngineBuffers, this);
      this.initEngine = __bind(this.initEngine, this);
      this.draw = __bind(this.draw, this);
      this.createShader = __bind(this.createShader, this);
      this.createVertexShader = __bind(this.createVertexShader, this);
      this.createFragmentShader = __bind(this.createFragmentShader, this);
      this.pressedKeys = [];
      if ((this.canvas = $("#" + cid)) && this.canvas.length && (this.canvEl = this.canvas[0]) && this.initEngine() && this.requestAnimFrame) {
        this.updateCanvasSize();
        this.play();
        return;
        this.addScene(this.scene = new CL3D.Scene());
        this.scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 48));
        this.scene.getRootSceneNode().addChild(this.skyBox = new CL3D.SkyBoxSceneNode());
        this.skyBox.getMaterial(5).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/stars.jpg', true);
        this.skyBox.getMaterial(4).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skxup.jpg', true);
        this.skyBox.getMaterial(0).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skx1.jpg', true);
        this.skyBox.getMaterial(2).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skx3.jpg', true);
        this.skyBox.getMaterial(1).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skx2.jpg', true);
        this.skyBox.getMaterial(3).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skx0.jpg', true);
        this.scene.getRootSceneNode().addChild(this.universe = new smio.gfx.UniverseSceneNode(this));
        this.scene.setActiveCamera(this.universe.cam);
        this.universe.camSettings(this.canvEl.width / this.canvEl.height, CL3D.degToRad(45), this.getSightDistance(20), 1);
      }
    }
    Engine.prototype.createFragmentShader = function(src) {
      return this.createShader(this.gl.FRAGMENT_SHADER, src);
    };
    Engine.prototype.createVertexShader = function(src) {
      return this.createShader(this.gl.VERTEX_SHADER, src);
    };
    Engine.prototype.createShader = function(type, src) {
      var gl, shader;
      if (gl = this.gl) {
        shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!(gl.getShaderParameter(shader, gl.COMPILE_STATUS))) {
          alert(gl.getShaderInfoLog(shader));
        }
      }
      return shader;
    };
    Engine.prototype.createVertex = function(x, y, z, s, t) {
      var v;
      v = new CL3D.Vertex3D(true);
      v.Pos.X = x;
      v.Pos.Y = y;
      v.Pos.Z = z;
      v.TCoords.X = s;
      v.TCoords.Y = t;
      return v;
    };
    Engine.prototype.draw = function() {
      var canvas, gl;
      if ((gl = this.gl) && (canvas = gl.canvas)) {
        gl.viewport(0, 0, this.canvasSize.wpx, this.canvasSize.hpx);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.perspective(45, this.canvasSize.wpx / this.canvasSize.hpx, 0.1, 100.0, this.pMatrix);
        mat4.identity(this.mvMatrix);
        mat4.translate(this.mvMatrix, [-1.5, 0.0, -7.0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
        gl.vertexAttribPointer(this.shaderProgram.myVertexPositionAttribute, this.triangleVertexPositionBuffer.myItemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexColorBuffer);
        gl.vertexAttribPointer(this.shaderProgram.myVertexColorAttribute, this.triangleVertexColorBuffer.myItemSize, gl.FLOAT, false, 0, 0);
        this.setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLES, 0, this.triangleVertexPositionBuffer.myNumItems);
        mat4.translate(this.mvMatrix, [3.0, 0.0, 0.0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        gl.vertexAttribPointer(this.shaderProgram.myVertexPositionAttribute, this.squareVertexPositionBuffer.myItemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexColorBuffer);
        gl.vertexAttribPointer(this.shaderProgram.myVertexColorAttribute, this.squareVertexColorBuffer.myItemSize, gl.FLOAT, false, 0, 0);
        this.setMatrixUniforms();
        return gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.squareVertexPositionBuffer.myNumItems);
      }
    };
    Engine.prototype.initEngine = function() {
      var canvas, gl, name, names, _i, _len, _ref;
      _ref = [this.canvEl, null, ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl']], canvas = _ref[0], gl = _ref[1], names = _ref[2];
      this.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
      this.mvMatrix = mat4.create();
      this.pMatrix = mat4.create();
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        try {
          gl = canvas.getContext(name, {
            alpha: true,
            depth: true,
            stencil: true,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
          });
        } catch (err) {

        }
        if (gl) {
          break;
        }
      }
      if ((this.gl = gl)) {
        this.initEngineShaders();
        this.initEngineBuffers();
        gl.clearColor(0.1, 0.2, 0.3, 1.0);
        gl.enable(gl.DEPTH_TEST);
      }
      return gl;
    };
    Engine.prototype.initEngineBuffers = function() {
      var gl;
      if ((gl = this.gl)) {
        this.triangleVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
        this.triangleVertexColorBuffer.myNumItems = 3;
        this.triangleVertexColorBuffer.myItemSize = 4;
        this.triangleVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0]), gl.STATIC_DRAW);
        this.triangleVertexPositionBuffer.myNumItems = 3;
        this.triangleVertexPositionBuffer.myItemSize = 3;
        this.squareVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.6, 0.3, 0.9, 1.0]), gl.STATIC_DRAW);
        this.squareVertexColorBuffer.myNumItems = 4;
        this.squareVertexColorBuffer.myItemSize = 4;
        this.squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0]), gl.STATIC_DRAW);
        this.squareVertexPositionBuffer.myNumItems = 4;
        return this.squareVertexPositionBuffer.myItemSize = 3;
      }
    };
    Engine.prototype.initEngineShaders = function() {
      var fragShader, gl, vertexShader;
      if ((gl = this.gl)) {
        vertexShader = this.createVertexShader(smio.gfx.Shaders.coloredVertexShader);
        fragShader = this.createFragmentShader(smio.gfx.Shaders.coloredFragmentShader);
        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, vertexShader);
        gl.attachShader(this.shaderProgram, fragShader);
        gl.linkProgram(this.shaderProgram);
        if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
          alert('Could not link shader program.');
        }
        gl.useProgram(this.shaderProgram);
        this.shaderProgram.myVertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
        gl.enableVertexAttribArray(this.shaderProgram.myVertexPositionAttribute);
        this.shaderProgram.myVertexColorAttribute = gl.getAttribLocation(this.shaderProgram, 'aVertexColor');
        gl.enableVertexAttribArray(this.shaderProgram.myVertexColorAttribute);
        this.shaderProgram.myPMatrixUniform = gl.getUniformLocation(this.shaderProgram, 'uPMatrix');
        return this.shaderProgram.myMVMatrixUniform = gl.getUniformLocation(this.shaderProgram, 'uMVMatrix');
      }
    };
    Engine.prototype.getSightDistance = function(eyeHeight) {
      return Math.sqrt((2 * smio.gfx.UniverseSceneNode.consts.earthRadius * eyeHeight) + (eyeHeight * eyeHeight));
    };
    Engine.prototype.isKeyPressed = function(keyCode) {
      if (!(keyCode != null)) {
        return this.pressedKeys.length;
      } else {
        return _.contains(this.pressedKeys, keyCode);
      }
    };
    Engine.prototype.handleKeyDown = function(e) {
      var c;
      if (!_.contains(this.pressedKeys, e.keyCode)) {
        this.pressedKeys.push(e.keyCode);
      }
      if ((c = String.fromCharCode(e.keyCode)) && (c = c.toUpperCase())) {
        if (c === 'C') {
          this.universe.camFar = !this.universe.camFar;
        }
      }
      return Engine.__super__.handleKeyDown.call(this, e);
    };
    Engine.prototype.handleKeyUp = function(e) {
      if (_.contains(this.pressedKeys, e.keyCode)) {
        this.pressedKeys = _.without(this.pressedKeys, e.keyCode);
      }
      return Engine.__super__.handleKeyUp.call(this, e);
    };
    Engine.prototype.handleMouseMove = function(e) {
      this.universe.mouseLook = true;
      return Engine.__super__.handleMouseMove.call(this, e);
    };
    Engine.prototype.isContextLost = function() {
      return this.gl.isContextLost;
    };
    Engine.prototype.play = function() {
      var getAnimFrame;
      getAnimFrame = this.requestAnimFrame;
      getAnimFrame(this.play);
      this.draw();
      return document.title = new Date().getTime();
    };
    Engine.prototype.setMatrixUniforms = function() {
      this.gl.uniformMatrix4fv(this.shaderProgram.myPMatrixUniform, false, this.pMatrix);
      return this.gl.uniformMatrix4fv(this.shaderProgram.myMVMatrixUniform, false, this.mvMatrix);
    };
    Engine.prototype.updateCanvasSize = function() {
      var height, width, _ref;
      _ref = [this.canvas.width(), this.canvas.height()], width = _ref[0], height = _ref[1];
      return this.canvasSize = {
        wpx: this.gl.drawingBufferWidth || this.gl.canvas.width,
        hpx: this.gl.drawingBufferHeight || this.gl.canvas.height,
        w: width,
        h: height,
        w2: width / 2,
        w4: width / 4,
        h22: height / 2.2,
        h15: height / 1.5
      };
    };
    return Engine;
  })();
}).call(this);
