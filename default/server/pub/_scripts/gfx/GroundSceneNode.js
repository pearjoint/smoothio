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
  smio.gfx.GroundSceneNode = (function() {
    __extends(GroundSceneNode, CL3D.SceneNode);
    function GroundSceneNode(engine) {
      var meshBuf;
      this.engine = engine;
      this.render = __bind(this.render, this);
      this.mapPositionToLatLong = __bind(this.mapPositionToLatLong, this);
      this.mapPositionFromLatLong = __bind(this.mapPositionFromLatLong, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      GroundSceneNode.__super__.constructor.call(this);
      this.init();
      this.mapWidth = 495;
      this.mapWidthHalf = this.mapHeight = this.mapWidth / 2;
      this.mapHeightHalf = this.mapHeight / 2;
      (this.mesh = new CL3D.Mesh()).AddMeshBuffer(meshBuf = new CL3D.MeshBuffer());
      meshBuf.Indices = [0, 1, 3, 1, 2, 3];
      meshBuf.Vertices.push(this.engine.createVertex(this.mapWidthHalf, 0, -this.mapHeightHalf, 0, 0));
      meshBuf.Vertices.push(this.engine.createVertex(-this.mapWidthHalf, 0, -this.mapHeightHalf, 1, 0));
      meshBuf.Vertices.push(this.engine.createVertex(-this.mapWidthHalf, 0, this.mapHeightHalf, 1, 1));
      meshBuf.Vertices.push(this.engine.createVertex(this.mapWidthHalf, 0, this.mapHeightHalf, 0, 1));
      meshBuf.Mat.Tex1 = this.engine.getTextureManager().getTexture('/_/file/images/textures/earth.png', true);
    }
    GroundSceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return GroundSceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    GroundSceneNode.prototype.mapPositionFromLatLong = function(lat, lon) {
      var pos;
      pos = smio.Util.Geo.mercator(lat, lon, this.mapWidth, this.mapHeight);
      document.title = JSON.stringify(pos);
      pos.x = this.mapWidthHalf - pos.x;
      pos.y = pos.y - this.mapHeightHalf;
      return pos;
    };
    GroundSceneNode.prototype.mapPositionToLatLong = function(x, z) {
      return {
        lat: 0,
        lon: 0
      };
    };
    GroundSceneNode.prototype.render = function(renderer) {
      renderer.setWorld(this.getAbsoluteTransformation());
      return renderer.drawMesh(this.mesh);
    };
    return GroundSceneNode;
  })();
}).call(this);
