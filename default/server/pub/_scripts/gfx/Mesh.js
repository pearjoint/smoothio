(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.gfx.Mesh = (function() {
    function Mesh(engine, posX, posY, posZ) {
      this.engine = engine;
      this.posX = posX != null ? posX : 0.0;
      this.posY = posY != null ? posY : 0.0;
      this.posZ = posZ != null ? posZ : 0.0;
      this.updateBuffers = __bind(this.updateBuffers, this);
      this.draw = __bind(this.draw, this);
      this.deleteBuffers = __bind(this.deleteBuffers, this);
      this.beforeDraw = __bind(this.beforeDraw, this);
      this.bufferIndex = 0;
    }
    Mesh.prototype.beforeDraw = function(gl, timings) {};
    Mesh.prototype.deleteBuffers = function() {
      var gl;
      if ((gl = this.engine.gl)) {
        if (this.colorBuffer) {
          gl.deleteBuffer(this.colorBuffer);
          delete this.colorBuffer;
        }
        if (this.normalBuffer) {
          gl.deleteBuffer(this.normalBuffer);
          delete this.normalBuffer;
        }
        if (this.vertexBuffer) {
          gl.deleteBuffer(this.vertexBuffer);
          delete this.vertexBuffer;
        }
        if (this.texCoordsBuffer) {
          gl.deleteBuffer(this.texCoordsBuffer);
          delete this.texCoordsBuffer;
        }
        if (this.indexBuffer) {
          gl.deleteBuffer(this.indexBuffer);
          return delete this.indexBuffer;
        }
      }
    };
    Mesh.prototype.draw = function(gl, timings) {};
    Mesh.prototype.updateBuffers = function(onlyIfCreated) {
      var createBuf, gl;
      createBuf = false;
      if ((gl = this.engine.gl)) {
        if (this.vertices && this.vertices.length) {
          if ((createBuf = !this.vertexBuffer)) {
            this.vertexBuffer = gl.createBuffer();
          }
          if ((!onlyIfCreated) || createBuf) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_.flatten(this.vertices)), gl.STATIC_DRAW);
          }
        }
        if (this.normals && this.normals.length) {
          if ((createBuf = !this.normalBuffer)) {
            this.normalBuffer = gl.createBuffer();
          }
          if ((!onlyIfCreated) || createBuf) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_.flatten(this.normals)), gl.STATIC_DRAW);
          }
        }
        if (this.indices && this.indices.length) {
          if ((createBuf = !this.indexBuffer)) {
            this.indexBuffer = gl.createBuffer();
          }
          if ((!onlyIfCreated) || createBuf) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
          }
        }
        if (this.colors && this.colors.length) {
          if ((createBuf = !this.colorBuffer)) {
            this.colorBuffer = gl.createBuffer();
          }
          if ((!onlyIfCreated) || createBuf) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_.flatten(this.colors)), gl.STATIC_DRAW);
          }
        }
        if (this.texCoords && this.texCoords.length) {
          if ((createBuf = !this.texCoordsBuffer)) {
            this.texCoordsBuffer = gl.createBuffer();
          }
          if ((!onlyIfCreated) || createBuf) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordsBuffer);
            return gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_.flatten(this.texCoords)), gl.STATIC_DRAW);
          }
        }
      }
    };
    return Mesh;
  })();
}).call(this);
