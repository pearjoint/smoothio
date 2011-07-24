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
  smio.gfx.MeshCube = (function() {
    __extends(MeshCube, smio.gfx.Mesh);
    function MeshCube(engine) {
      var i;
      this.engine = engine;
      this.draw = __bind(this.draw, this);
      this.beforeDraw = __bind(this.beforeDraw, this);
      MeshCube.__super__.constructor.call(this, this.engine, 0.0, 0.0, -4.0);
      if (false) {
        this.colors = [];
        for (i = 0; i < 24; i++) {
          this.colors.push([Math.random(), Math.random(), Math.random(), 1.0]);
        }
      } else {
        this.texCoords = [[0.0, 1.0], [1.0, 1.0], [1.0, 0.0], [0.0, 0.0], [1.0, 1.0], [1.0, 0.0], [0.0, 0.0], [0.0, 1.0], [0.0, 0.0], [0.0, 1.0], [1.0, 1.0], [1.0, 0.0], [1.0, 0.0], [0.0, 0.0], [0.0, 1.0], [1.0, 1.0], [1.0, 1.0], [1.0, 0.0], [0.0, 0.0], [0.0, 1.0], [0.0, 1.0], [1.0, 1.0], [1.0, 0.0], [0.0, 0.0]];
      }
      this.indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
      this.normals = [[0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0]];
      this.vertices = [[-1.0, -1.0, 1.0], [1.0, -1.0, 1.0], [1.0, 1.0, 1.0], [-1.0, 1.0, 1.0], [-1.0, -1.0, -1.0], [-1.0, 1.0, -1.0], [1.0, 1.0, -1.0], [1.0, -1.0, -1.0], [-1.0, 1.0, -1.0], [-1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, -1.0], [-1.0, -1.0, -1.0], [1.0, -1.0, -1.0], [1.0, -1.0, 1.0], [-1.0, -1.0, 1.0], [1.0, -1.0, -1.0], [1.0, 1.0, -1.0], [1.0, 1.0, 1.0], [1.0, -1.0, 1.0], [-1.0, -1.0, -1.0], [-1.0, -1.0, 1.0], [-1.0, 1.0, 1.0], [-1.0, 1.0, -1.0]];
      this.rotDeg = 0;
      this.roxX = this.rotZ = this.rotY = 0;
    }
    MeshCube.prototype.beforeDraw = function(gl, timings) {
      return this.roxX = this.rotZ = this.rotY = smio.Util.Number.degToRad(this.rotDeg += (45 * timings.dif) / 1000);
    };
    MeshCube.prototype.draw = function(gl, timings) {
      return gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, this.bufferIndex);
    };
    return MeshCube;
  })();
}).call(this);
