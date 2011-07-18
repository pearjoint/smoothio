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
  smio.gfx.Renderer = (function() {
    __extends(Renderer, CL3D.CopperLicht);
    function Renderer(cid) {
      this.isContextLost = __bind(this.isContextLost, this);
      this.handleMouseMove = __bind(this.handleMouseMove, this);
      this.handleKeyUp = __bind(this.handleKeyUp, this);
      this.handleKeyDown = __bind(this.handleKeyDown, this);
      this.getSightDistance = __bind(this.getSightDistance, this);      Renderer.__super__.constructor.call(this, cid, false, 30, false);
      this.pressedKeys = [];
      if ((this.canvas = $("#" + cid)) && (this.initRenderer())) {
        this.addScene(this.scene = new CL3D.Scene());
        this.scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 48));
        this.scene.getRootSceneNode().addChild(this.universe = new smio.gfx.UniverseSceneNode(this));
        this.scene.setActiveCamera(this.universe.cam);
        this.universe.camSettings(this.canvas.prop('width') / this.canvas.prop('height'), CL3D.degToRad(45), this.getSightDistance(20), 1);
      }
    }
    Renderer.prototype.createVertex = function(x, y, z, s, t) {
      var v;
      v = new CL3D.Vertex3D(true);
      v.Pos.X = x;
      v.Pos.Y = y;
      v.Pos.Z = z;
      v.TCoords.X = s;
      v.TCoords.Y = t;
      return v;
    };
    Renderer.prototype.getSightDistance = function(eyeHeight) {
      return Math.sqrt((2 * smio.gfx.UniverseSceneNode.consts.earthRadius * eyeHeight) + (eyeHeight * eyeHeight));
    };
    Renderer.prototype.handleKeyDown = function(e) {
      var c;
      if (!_.contains(this.pressedKeys, e.keyCode)) {
        this.pressedKeys.push(e.keyCode);
      }
      if ((c = String.fromCharCode(e.keyCode)) && (c = c.toUpperCase())) {
        if (c === 'C') {
          this.universe.camFar = !this.universe.camFar;
        }
      }
      return Renderer.__super__.handleKeyDown.call(this, e);
    };
    Renderer.prototype.handleKeyUp = function(e) {
      if (_.contains(this.pressedKeys, e.keyCode)) {
        this.pressedKeys = _.without(this.pressedKeys, e.keyCode);
      }
      return Renderer.__super__.handleKeyUp.call(this, e);
    };
    Renderer.prototype.handleMouseMove = function(e) {
      return Renderer.__super__.handleMouseMove.call(this, e);
    };
    Renderer.prototype.isContextLost = function() {
      return this.getRenderer().getWebGL().isContextLost;
    };
    return Renderer;
  })();
}).call(this);
