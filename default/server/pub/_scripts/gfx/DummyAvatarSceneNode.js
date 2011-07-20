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
  smio.gfx.DummyAvatarSceneNode = (function() {
    __extends(DummyAvatarSceneNode, CL3D.SceneNode);
    function DummyAvatarSceneNode(engine, name, posx, posy, posz, height) {
      var subHeight;
      this.engine = engine;
      if (height == null) {
        height = 1.8;
      }
      this.updateAbsolutePosition = __bind(this.updateAbsolutePosition, this);
      this.rotate = __bind(this.rotate, this);
      this.render = __bind(this.render, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      this.goTo = __bind(this.goTo, this);
      DummyAvatarSceneNode.__super__.constructor.call(this, this.engine);
      this.init();
      subHeight = (height - 0.3) / 2;
      this.addChild(this.body = new CL3D.CubeSceneNode(subHeight - 0.025));
      this.addChild(this.legs = new CL3D.CubeSceneNode(subHeight - 0.025));
      this.legs.Pos.Y = subHeight / 2;
      this.body.Pos.Y = (subHeight / 2) + subHeight;
      this.body.Rot.Y = 45;
      this.legs.updateAbsolutePosition();
      this.body.updateAbsolutePosition();
      this.legs.getMaterial(0).Tex1 = this.engine.getTextureManager().getTexture("/_/file/images/textures/" + name + ".jpg", true);
      this.body.getMaterial(0).Tex1 = this.engine.getTextureManager().getTexture("/_/file/images/textures/" + name + ".jpg", true);
      this.addChild(this.head = new smio.gfx.SphereSceneNode(this.engine, 0.25, 0, height - 0.15, 0));
      this.Pos.X = posx;
      this.Pos.Y = posy;
      this.Pos.Z = posz;
      this.updateAbsolutePosition();
    }
    DummyAvatarSceneNode.prototype.goTo = function(x, z, isLonLat) {
      var p, _ref;
      if (isLonLat) {
        p = Proj4js.transform(smio.Util.Geo.wgs, smio.Util.Geo.epsg, p = {
          x: x,
          y: z
        });
        _ref = [p.x, p.y], x = _ref[0], z = _ref[1];
      }
      this.Pos.X = x;
      this.Pos.Z = z;
      return this.updateAbsolutePosition();
    };
    DummyAvatarSceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return DummyAvatarSceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    DummyAvatarSceneNode.prototype.render = function(renderer) {
      renderer.setWorld(this.getAbsoluteTransformation());
      return DummyAvatarSceneNode.__super__.render.call(this, renderer);
    };
    DummyAvatarSceneNode.prototype.rotate = function(deg) {
      var cy, y;
      cy = this.Rot.Y;
      y = cy + deg;
      if (y < 0) {
        y = 360 + cy;
      }
      if (y > 360) {
        y = cy - 360;
      }
      return this.Rot.Y = y;
    };
    DummyAvatarSceneNode.prototype.updateAbsolutePosition = function() {
      var lonLat;
      DummyAvatarSceneNode.__super__.updateAbsolutePosition.call(this);
      lonLat = Proj4js.transform(smio.Util.Geo.epsg, smio.Util.Geo.wgs, lonLat = {
        x: this.Pos.X,
        y: this.Pos.Z
      });
      this.posLon = lonLat.x;
      this.posLat = lonLat.y;
      return this.posLatRad = CL3D.degToRad(this.posLat);
    };
    return DummyAvatarSceneNode;
  })();
}).call(this);
