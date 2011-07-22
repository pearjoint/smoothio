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
  smio.gfx.MeshBillboard3 = (function() {
    __extends(MeshBillboard3, smio.gfx.Mesh);
    function MeshBillboard3(engine) {
      this.engine = engine;
      this.draw = __bind(this.draw, this);
      this.beforeDraw = __bind(this.beforeDraw, this);
      MeshBillboard3.__super__.constructor.call(this, this.engine, 1.5, 0.0, -1.0);
      this.colors = [[1.0, 0.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 1.0]];
      this.vertices = [[0.0, 1.0, 0.0], [-1.0, -1.0, 0.0], [1.0, -1.0, 0.0]];
      this.rotDeg = 0;
      this.rotX = 0;
    }
    MeshBillboard3.prototype.beforeDraw = function(gl, timings) {
      return this.rotX = smio.Util.Number.degToRad(this.rotDeg -= (135 * timings.dif) / 1000);
    };
    MeshBillboard3.prototype.draw = function(gl, timings) {
      return gl.drawArrays(gl.TRIANGLES, this.bufferIndex, this.vertices.length);
    };
    return MeshBillboard3;
  })();
}).call(this);
