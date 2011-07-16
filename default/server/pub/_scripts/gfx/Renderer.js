(function() {
  var smio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
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
      Renderer.__super__.constructor.call(this, cid, true, 30, true);
      if (this.initRenderer()) {
        this.addScene(this.scene = new CL3D.Scene());
        this.scene.setBackgroundColor(CL3D.createColor(1, 0, 0, 64));
        this.scene.getRootSceneNode().addChild(this.node = new smio.gfx.SceneNode(this));
        this.node.addAnimator(new CL3D.AnimatorRotation(new CL3D.Vect3d(0, 0.6, 0.8)));
        this.billboard = new CL3D.BillboardSceneNode();
        this.billboard.setSize(20, 20);
        this.billboard.Pos.Y = 30;
        this.billboard.getMaterial(0).Tex1 = this.getTextureManager().getTexture('/_/file/images/bg1.jpg', true);
        this.billboard.getMaterial(0).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR;
        this.scene.getRootSceneNode().addChild(this.billboard);
        this.cam = new CL3D.CameraSceneNode();
        this.cam.Pos.X = 50;
        this.cam.Pos.Y = 20;
        this.cam.addAnimator(this.animator = new CL3D.AnimatorCameraFPS(this.cam, this));
        this.animator.lookAt(new CL3D.Vect3d(0, 20, 0));
        this.scene.getRootSceneNode().addChild(this.cam);
        this.scene.setActiveCamera(this.cam);
      }
    }
    return Renderer;
  })();
}).call(this);
