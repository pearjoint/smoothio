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
  smio.gfx.MeshPyramid = (function() {
    __extends(MeshPyramid, smio.gfx.Mesh);
    function MeshPyramid(engine) {
      this.engine = engine;
      this.draw = __bind(this.draw, this);
      this.beforeDraw = __bind(this.beforeDraw, this);
      MeshPyramid.__super__.constructor.call(this, this.engine, 1, 0.0, -6.0);
      this.colors = [[Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0], [Math.random(), Math.random(), Math.random(), 1.0]];
      this.vertices = [[0.0, 1.0, 0.0], [-1.0, -1.0, 1.0], [1.0, -1.0, 1.0], [0.0, 1.0, 0.0], [1.0, -1.0, 1.0], [1.0, -1.0, -1.0], [0.0, 1.0, 0.0], [1.0, -1.0, -1.0], [-1.0, -1.0, -1.0], [0.0, 1.0, 0.0], [-1.0, -1.0, -1.0], [-1.0, -1.0, 1.0]];
      this.rotDeg = 0;
      this.rotX = 0;
    }
    MeshPyramid.prototype.beforeDraw = function(gl, timings) {
      return this.rotZ = this.rotY = this.rotX = smio.Util.Number.degToRad(this.rotDeg -= (135 * timings.dif) / 1000);
    };
    MeshPyramid.prototype.draw = function(gl, timings) {
      return gl.drawArrays(gl.TRIANGLES, this.bufferIndex, this.vertices.length);
    };
    return MeshPyramid;
  })();
}).call(this);
