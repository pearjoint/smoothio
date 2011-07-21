(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.gfx.SectorTileSceneNode = (function() {
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
