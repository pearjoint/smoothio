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
  smio.gfx.SectorTileSceneNode = (function() {
    __extends(SectorTileSceneNode, CL3D.SceneNode);
    function SectorTileSceneNode(engine, tileNumX, tileNumY) {
      this.engine = engine;
      this.tileNumX = tileNumX;
      this.tileNumY = tileNumY;
      this.render = __bind(this.render, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      SectorTileSceneNode.__super__.constructor.call(this);
      this.init();
    }
    SectorTileSceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return SectorTileSceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    SectorTileSceneNode.prototype.render = function(renderer) {
      return renderer.setWorld(this.getAbsoluteTransformation());
    };
    return SectorTileSceneNode;
  })();
}).call(this);
