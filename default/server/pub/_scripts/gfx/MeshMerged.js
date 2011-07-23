(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = global.smoothio;
  smio.gfx.MeshMerged = (function() {
    __extends(MeshMerged, smio.gfx.Mesh);
    function MeshMerged(engine, meshes) {
      var last, mesh, _i, _len, _ref;
      this.engine = engine;
      this.meshes = meshes;
      this.updateBuffers = __bind(this.updateBuffers, this);
      this.draw = __bind(this.draw, this);
      this.beforeDraw = __bind(this.beforeDraw, this);
      MeshMerged.__super__.constructor.call(this, this.engine, 0.0, 0.0, -7.0);
      last = 0;
      this.rotDeg = 0;
      this.rotZ = 0;
      _ref = this.meshes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mesh = _ref[_i];
        mesh.bufferIndex = last;
        last += mesh.vertices.length;
      }
    }
    MeshMerged.prototype.beforeDraw = function(gl, timings) {
      var mesh, _i, _len, _ref;
      _ref = this.meshes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mesh = _ref[_i];
        mesh.beforeDraw(gl, timings);
      }
      return this.rotZ = smio.Util.Number.degToRad(this.rotDeg -= (45 * timings.dif) / 1000);
    };
    MeshMerged.prototype.draw = function(gl, timings) {
      var mesh, _i, _len, _ref, _results;
      _ref = this.meshes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mesh = _ref[_i];
        this.engine.pushMatrix();
        mat4.translate(this.engine.modelViewMatrix, [mesh.posX, mesh.posY, mesh.posZ]);
        if (mesh.rotX) {
          mat4.rotateX(this.engine.modelViewMatrix, mesh.rotX);
        }
        if (mesh.rotY) {
          mat4.rotateY(this.engine.modelViewMatrix, mesh.rotY);
        }
        if (mesh.rotZ) {
          mat4.rotateZ(this.engine.modelViewMatrix, mesh.rotZ);
        }
        mesh.draw(gl, timings);
        _results.push(this.engine.popMatrix());
      }
      return _results;
    };
    MeshMerged.prototype.updateBuffers = function(onlyIfCreated) {
      var col, mesh, vert, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
      this.colors = [];
      this.vertices = [];
      _ref = this.meshes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mesh = _ref[_i];
        if (mesh.colors) {
          _ref2 = mesh.colors;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            col = _ref2[_j];
            this.colors.push(col);
          }
        }
        if (mesh.vertices) {
          _ref3 = mesh.vertices;
          for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
            vert = _ref3[_k];
            this.vertices.push(vert);
          }
        }
      }
      return MeshMerged.__super__.updateBuffers.call(this);
    };
    return MeshMerged;
  })();
}).call(this);
