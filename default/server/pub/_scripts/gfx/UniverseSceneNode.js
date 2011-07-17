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
  smio.gfx.UniverseSceneNode = (function() {
    __extends(UniverseSceneNode, CL3D.SceneNode);
    UniverseSceneNode.consts = {
      astroDist: 149597870700,
      earthRadius: 6378100,
      moonDist: 356400000,
      moonRadius: 1738140,
      sunRadius: 697000000
    };
    function UniverseSceneNode(engine) {
      this.engine = engine;
      this.render = __bind(this.render, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      UniverseSceneNode.__super__.constructor.call(this, this.engine);
      this.init();
      this.addChild(this.earth = new smio.gfx.SphereSceneNode(this.engine, smio.gfx.UniverseSceneNode.consts.earthRadius, 0, 0, 0));
    }
    UniverseSceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return UniverseSceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    UniverseSceneNode.prototype.render = function(renderer) {
      renderer.setWorld(this.getAbsoluteTransformation());
      return this.earth.render(renderer);
    };
    return UniverseSceneNode;
  })();
}).call(this);
