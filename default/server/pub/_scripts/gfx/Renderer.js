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
      this.isContextLost = __bind(this.isContextLost, this);      Renderer.__super__.constructor.call(this, cid, false, 30, false);
      if ((this.canvas = $("#" + cid)) && (this.initRenderer())) {
        this.addScene(this.scene = new CL3D.Scene());
        this.scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 48));
        this.scene.getRootSceneNode().addChild(this.universe = new smio.gfx.UniverseSceneNode(this));
        this.cam = new CL3D.CameraSceneNode();
        this.cam.setFov(CL3D.degToRad(70));
        this.cam.setAspectRatio(this.canvas.prop('width') / this.canvas.prop('height'));
        this.cam.setFarValue((smio.gfx.UniverseSceneNode.consts.astroDist + 1) * 10);
        this.cam.setNearValue(1);
        this.cam.Pos.X = -8378100;
        this.cam.Pos.Y = 0;
        this.animator = new CL3D.AnimatorCameraFPS(this.cam, this);
        this.cam.addAnimator(this.animator);
        this.animator.lookAt(new CL3D.Vect3d(0, 0, 0));
        this.scene.getRootSceneNode().addChild(this.cam);
        this.scene.setActiveCamera(this.cam);
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
    Renderer.prototype.isContextLost = function() {
      return this.getRenderer().getWebGL().isContextLost;
    };
    return Renderer;
  })();
}).call(this);
