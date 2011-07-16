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
      if ((this.canvas = $("#" + cid)) && (this.initRenderer())) {
        this.addScene(this.scene = new CL3D.Scene());
        this.scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 0));
        this.scene.getRootSceneNode().addChild(this.universe = new smio.gfx.UniverseSceneNode(this));
        this.skybox = new CL3D.SkyBoxSceneNode();
        this.skybox.getMaterial(0).Tex1 = this.getTextureManager().getTexture('/_/file/images/univ2.png', true);
        this.skybox.getMaterial(0).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR;
        this.skybox.getMaterial(1).Tex1 = this.getTextureManager().getTexture('/_/file/images/univ1.png', true);
        this.skybox.getMaterial(1).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR;
        this.skybox.getMaterial(2).Tex1 = this.getTextureManager().getTexture('/_/file/images/univ1.png', true);
        this.skybox.getMaterial(2).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR;
        this.skybox.getMaterial(3).Tex1 = this.getTextureManager().getTexture('/_/file/images/univ2.png', true);
        this.skybox.getMaterial(3).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR;
        this.skybox.getMaterial(4).Tex1 = this.getTextureManager().getTexture('/_/file/images/univ1.png', true);
        this.skybox.getMaterial(4).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR;
        this.skybox.getMaterial(5).Tex1 = this.getTextureManager().getTexture('/_/file/images/univ2.png', true);
        this.skybox.getMaterial(5).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR;
        this.scene.getRootSceneNode().addChild(this.skybox);
        this.cam = new CL3D.CameraSceneNode();
        this.cam.setAspectRatio(this.canvas.prop('width') / this.canvas.prop('height'));
        this.cam.setFov(45);
        this.cam.Pos.X = 50;
        this.cam.Pos.Y = 20;
        this.animator = new CL3D.AnimatorCameraFPS(this.cam, this);
        this.cam.addAnimator(this.animator);
        this.animator.lookAt(new CL3D.Vect3d(0, 20, 0));
        this.scene.getRootSceneNode().addChild(this.cam);
        this.scene.setActiveCamera(this.cam);
      }
    }
    return Renderer;
  })();
}).call(this);
