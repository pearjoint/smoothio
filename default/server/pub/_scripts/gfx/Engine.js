(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.gfx.Engine = (function() {
    function Engine(ctl, cid) {
      this.ctl = ctl;
      this.updateCanvasSize = __bind(this.updateCanvasSize, this);
      this.pushMatrix = __bind(this.pushMatrix, this);
      this.popMatrix = __bind(this.popMatrix, this);
      this.play = __bind(this.play, this);
      this.handleMouseMove = __bind(this.handleMouseMove, this);
      this.handleKeyUp = __bind(this.handleKeyUp, this);
      this.handleKeyDown = __bind(this.handleKeyDown, this);
      this.isKeyPressed = __bind(this.isKeyPressed, this);
      this.getSightDistance = __bind(this.getSightDistance, this);
      this.initEngineShaders = __bind(this.initEngineShaders, this);
      this.initEngineBuffers = __bind(this.initEngineBuffers, this);
      this.initEngine = __bind(this.initEngine, this);
      this.drawMesh = __bind(this.drawMesh, this);
      this.draw = __bind(this.draw, this);
      this.createShader = __bind(this.createShader, this);
      this.createVertexShader = __bind(this.createVertexShader, this);
      this.createFragmentShader = __bind(this.createFragmentShader, this);
      this.drawTimes = [];
      this.lastDrawTime = 0;
      this.pressedKeys = [];
      this.matrixStack = [];
      this.shaders = {};
      this.meshes = [new smio.gfx.MeshCube(this)];
      if ((this.canvas = $("#" + cid)) && this.canvas.length && (this.canvEl = this.canvas[0]) && this.initEngine() && this.requestAnimFrame) {
        this.texMan = new smio.gfx.TextureManager(this);
        this.texMan.load('stones', '/_/file/images/textures/stones.jpg');
        this.texMan.load('wood', '/_/file/images/textures/wood.jpg');
        this.texMan.load('sky3', '/_/file/images/textures/skydn.jpg');
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
    Engine.prototype.draw = function(timings) {
      var canvas, gl, mesh, name, shaderProg, _i, _len, _ref, _ref2, _results;
      if ((gl = this.gl) && (canvas = gl.canvas)) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.identity(this.modelViewMatrix);
        _ref = this.shaders;
        for (name in _ref) {
          shaderProg = _ref[name];
          gl.uniformMatrix4fv(shaderProg.uniforms.pMatrix, false, this.projectionMatrix);
        }
        _ref2 = this.meshes;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          mesh = _ref2[_i];
          _results.push(!mesh.hidden ? this.drawMesh(gl, mesh, timings) : void 0);
        }
        return _results;
      }
    };
    Engine.prototype.drawMesh = function(gl, mesh, timings) {
      var name, shader, shaderProg, _ref, _ref2, _ref3, _ref4, _ref5;
      this.pushMatrix();
      mesh.beforeDraw(gl, timings);
      mat4.translate(this.modelViewMatrix, [mesh.posX, mesh.posY, mesh.posZ]);
      if (mesh.rotX) {
        mat4.rotateX(this.modelViewMatrix, mesh.rotX);
      }
      if (mesh.rotY) {
        mat4.rotateY(this.modelViewMatrix, mesh.rotY);
      }
      if (mesh.rotZ) {
        mat4.rotateZ(this.modelViewMatrix, mesh.rotZ);
      }
      if (mesh.vertexBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
        _ref = this.shaders;
        for (name in _ref) {
          shader = _ref[name];
          gl.vertexAttribPointer(shader.atts.aVertexPosition, mesh.vertices[0].length, gl.FLOAT, false, 0, 0);
        }
      }
      if (mesh.colorBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorBuffer);
        _ref2 = this.shaders;
        for (name in _ref2) {
          shader = _ref2[name];
          gl.vertexAttribPointer(shader.atts.aVertexColor, mesh.colors[0].length, gl.FLOAT, false, 0, 0);
        }
      }
      if (mesh.texCoordsBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.texCoordsBuffer);
        _ref3 = this.shaders;
        for (name in _ref3) {
          shader = _ref3[name];
          gl.vertexAttribPointer(shader.atts.aTexCoord, mesh.texCoords[0].length, gl.FLOAT, false, 0, 0);
        }
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texMan.textures['sky3']);
        _ref4 = this.shaders;
        for (name in _ref4) {
          shader = _ref4[name];
          gl.uniform1i(shader.uniforms.uSampler, 0);
        }
      }
      if (mesh.indexBuffer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
      }
      _ref5 = this.shaders;
      for (name in _ref5) {
        shaderProg = _ref5[name];
        gl.uniformMatrix4fv(shaderProg.uniforms.mvMatrix, false, this.modelViewMatrix);
      }
      mesh.draw(gl, timings);
      return this.popMatrix();
    };
    Engine.prototype.initEngine = function() {
      var canvas, gl, name, names, _i, _len, _ref;
      _ref = [this.canvEl, null, ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl']], canvas = _ref[0], gl = _ref[1], names = _ref[2];
      this.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
      this.modelViewMatrix = mat4.create();
      this.projectionMatrix = mat4.create();
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        try {
          gl = canvas.getContext(name, {
            alpha: false,
            depth: true,
            stencil: true,
            antialias: true,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false
          });
        } catch (_e) {}
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
      var gl, mesh, _i, _len, _ref, _results;
      if ((gl = this.gl)) {
        _ref = this.meshes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          mesh = _ref[_i];
          _results.push(mesh.updateBuffers());
        }
        return _results;
      }
    };
    Engine.prototype.initEngineShaders = function() {
      var attName, fragShader, gl, name, prog, shader, uniName, vertexShader, _ref, _results;
      if ((gl = this.gl)) {
        _ref = smio.gfx.Shaders;
        _results = [];
        for (name in _ref) {
          shader = _ref[name];
          _results.push((function() {
            var _i, _j, _len, _len2, _ref2, _ref3, _results2;
            if (!shader.disabled) {
              vertexShader = this.createVertexShader(shader.vertex);
              fragShader = this.createFragmentShader(shader.fragment);
              this.shaders[name] = prog = gl.createProgram();
              gl.attachShader(prog, vertexShader);
              gl.attachShader(prog, fragShader);
              gl.linkProgram(prog);
              if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
                alert('Could not link shader program.');
              }
              gl.useProgram(prog);
              if ((!shader.atts) || !shader.atts.length) {
                shader.atts = ['aVertexPosition'];
              } else if (!_.contains(shader.atts, 'aVertexPosition')) {
                shader.atts.push('aVertexPosition');
              }
              prog.atts = {};
              prog.uniforms = {
                pMatrix: gl.getUniformLocation(prog, 'uPMatrix'),
                mvMatrix: gl.getUniformLocation(prog, 'uMVMatrix')
              };
              _ref2 = shader.uniforms;
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                uniName = _ref2[_i];
                prog.uniforms[uniName] = gl.getUniformLocation(prog, uniName);
              }
              _ref3 = shader.atts;
              _results2 = [];
              for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
                attName = _ref3[_j];
                _results2.push(gl.enableVertexAttribArray(prog.atts[attName] = gl.getAttribLocation(prog, attName)));
              }
              return _results2;
            }
          }).call(this));
        }
        return _results;
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
    Engine.prototype.play = function() {
      var getAnimFrame, now, timings;
      getAnimFrame = this.requestAnimFrame;
      if (this.gl.isContextLost()) {
        alert('context lost');
      }
      timings = {
        now: (now = new Date().getTime()),
        last: this.lastDrawTime,
        dif: now - this.lastDrawTime
      };
      this.drawTimes.push(timings.dif);
      this.draw(timings);
      this.lastDrawTime = now;
      return getAnimFrame(this.play);
    };
    Engine.prototype.popMatrix = function() {
      return this.modelViewMatrix = this.matrixStack.pop();
    };
    Engine.prototype.pushMatrix = function() {
      var copy;
      copy = mat4.create();
      mat4.set(this.modelViewMatrix, copy);
      return this.matrixStack.push(copy);
    };
    Engine.prototype.updateCanvasSize = function() {
      var height, width, _ref;
      _ref = [this.canvas.width(), this.canvas.height()], width = _ref[0], height = _ref[1];
      this.canvasSize = {
        wpx: this.gl.drawingBufferWidth || this.gl.canvas.width,
        hpx: this.gl.drawingBufferHeight || this.gl.canvas.height,
        w: width,
        h: height,
        w2: width / 2,
        w4: width / 4,
        h22: height / 2.2,
        h15: height / 1.5
      };
      document.title = "" + this.canvasSize.wpx + " x " + this.canvasSize.hpx;
      this.gl.viewport(0, 0, this.canvasSize.wpx, this.canvasSize.hpx);
      return mat4.perspective(45, this.canvasSize.wpx / this.canvasSize.hpx, 0.1, 100.0, this.projectionMatrix);
    };
    return Engine;
  })();
}).call(this);
