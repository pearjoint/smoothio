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
    function UniverseSceneNode(engine) {
      var buf;
      this.engine = engine;
      this.render = __bind(this.render, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      UniverseSceneNode.__super__.constructor.call(this, this.engine);
      this.init();
      (this.mesh = new CL3D.Mesh()).AddMeshBuffer(buf = new CL3D.MeshBuffer());
      buf.Indices = [0, 2, 3, 2, 1, 3, 1, 0, 3, 2, 0, 1];
      buf.Vertices.push(this.createVertex(0, 0, 10, 0, 0));
      buf.Vertices.push(this.createVertex(10, 0, -10, 1, 0));
      buf.Vertices.push(this.createVertex(0, 20, 0, 0, 1));
      buf.Vertices.push(this.createVertex(-10, 20, -10, 1, 1));
      buf.Mat.Tex1 = this.engine.getTextureManager().getTexture('/_/file/images/bg0.jpg', true);
    }
    UniverseSceneNode.prototype.createVertex = function(x, y, z, s, t) {
      var v;
      v = new CL3D.Vertex3D(true);
      v.Pos.X = x;
      v.Pos.Y = y;
      v.Pos.Z = z;
      v.TCoords.X = s;
      v.TCoords.Y = t;
      return v;
    };
    UniverseSceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return UniverseSceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    UniverseSceneNode.prototype.render = function(renderer) {
      renderer.setWorld(this.getAbsoluteTransformation());
      return renderer.drawMesh(this.mesh);
    };
    return UniverseSceneNode;
  })();
}).call(this);
