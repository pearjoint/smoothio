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
      var meshBuf, size;
      this.engine = engine;
      this.render = __bind(this.render, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      GroundSceneNode.__super__.constructor.call(this);
      this.init();
      size = 4096;
      (this.mesh = new CL3D.Mesh()).AddMeshBuffer(meshBuf = new CL3D.MeshBuffer());
      meshBuf.Indices = [3, 1, 2, 0, 1, 3];
      meshBuf.Vertices.push(this.engine.createVertex(size, 0, -size, 0, 0));
      meshBuf.Vertices.push(this.engine.createVertex(-size, 0, -size, 1, 0));
      meshBuf.Vertices.push(this.engine.createVertex(-size, 0, size, 1, 1));
      meshBuf.Vertices.push(this.engine.createVertex(size, 0, size, 0, 1));
      meshBuf.Mat.Tex1 = this.engine.getTextureManager().getTexture('/_/file/images/bg3.jpg', true);
    }
    GroundSceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return GroundSceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    GroundSceneNode.prototype.render = function(renderer) {
      renderer.setWorld(this.getAbsoluteTransformation());
      return renderer.drawMesh(this.mesh);
    };
    return GroundSceneNode;
  })();
}).call(this);
