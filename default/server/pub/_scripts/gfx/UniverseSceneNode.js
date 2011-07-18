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
      earthDist: 49500000,
      earthRadius: 6378100,
      moonDist: 356400000,
      moonRadius: 1738140,
      sunRadius: 697000000
    };
    function UniverseSceneNode(engine) {
      this.engine = engine;
      this.render = __bind(this.render, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      this.camSettings = __bind(this.camSettings, this);
      UniverseSceneNode.__super__.constructor.call(this, this.engine);
      this.init();
      this.addChild(this.debugOutput = new CL3D.Overlay2DSceneNode(this));
      this.debugOutput.set2DPosition(0, 0, 840, 12);
      this.debugOutput.setShowBackgroundColor(true, CL3D.createColor(255, 255, 255, 255));
      this.debugOutput.FontName = '8;default;arial;normal;normal;false';
      this.addChild(this.ground = new smio.gfx.GroundSceneNode(this.engine));
      this.addChild(this.fig1 = new smio.gfx.DummyAvatarSceneNode(this.engine, 1, 3, 0, 0, 1.6));
      this.addChild(this.curFig = this.fig2 = new smio.gfx.DummyAvatarSceneNode(this.engine, 2, -3, 0, 0, 1.9));
      this.fig2.addChild(this.cam = new CL3D.CameraSceneNode());
      this.cam.Pos.X = 0;
      this.cam.Pos.Y = this.curFig.head.Pos.Y;
      this.cam.Pos.Z = -3.5;
      this.cam.setTarget(this.curFig.head.getAbsolutePosition());
      this.cam.updateAbsolutePosition();
      this.camFar = true;
    }
    UniverseSceneNode.prototype.camSettings = function(aspectRatio, fieldOfView, farValue, nearValue) {
      var obj;
      obj = this;
      if (fieldOfView != null) {
        obj.cam.setFov(fieldOfView);
      }
      if (aspectRatio != null) {
        obj.cam.setAspectRatio(aspectRatio);
      }
      if (farValue != null) {
        obj.cam.setFarValue(farValue);
      }
      if (nearValue != null) {
        return obj.cam.setNearValue(nearValue);
      }
    };
    UniverseSceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return UniverseSceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    UniverseSceneNode.prototype.render = function(r) {
      var cam, cur, far, moveDiff, moveDiffXZ, near, pi, pressed, rotate, self, updatePos, xz, _ref;
      _ref = [false, Math.PI, this.cam], updatePos = _ref[0], pi = _ref[1], cam = _ref[2];
      pressed = __bind(function(keyCode) {
        return _.contains(this.engine.pressedKeys, keyCode);
      }, this);
      moveDiff = function(step) {
        if (step == null) {
          step = 0.3;
        }
        return step * (pressed(16) ? 10 : 1);
      };
      moveDiffXZ = __bind(function(step) {
        var mult, rad;
        if (step == null) {
          step = 0.05;
        }
        rad = CL3D.degToRad(this.curFig.Rot.Y);
        mult = pressed(16) ? 44 : 1;
        return [Math.sin(rad) * step * mult, Math.cos(rad) * step * mult];
      }, this);
      rotate = __bind(function(deg) {
        var cy, y;
        cy = this.curFig.Rot.Y;
        y = cy + deg;
        if (y < 0) {
          y = 360 + cy;
        }
        if (y > 360) {
          y = cy - 360;
        }
        return this.curFig.Rot.Y = y;
      }, this);
      if (pressed(37) && !pressed(39)) {
        rotate(-3);
        updatePos = true;
      }
      if (pressed(39) && !pressed(37)) {
        rotate(3);
        updatePos = true;
      }
      if (pressed(38) && !pressed(40)) {
        if (pressed(17)) {
          this.curFig.Pos.Y += moveDiff();
        } else {
          xz = moveDiffXZ();
          this.curFig.Pos.X += xz[0];
          this.curFig.Pos.Z += xz[1];
        }
        updatePos = true;
      }
      if (pressed(40) && !pressed(38)) {
        if (pressed(17)) {
          this.curFig.Pos.Y -= moveDiff();
          if (this.curFig.Pos.Y < 0) {
            this.curFig.Pos.Y = 0;
          }
        } else {
          xz = moveDiffXZ();
          this.curFig.Pos.X -= xz[0];
          this.curFig.Pos.Z -= xz[1];
        }
        updatePos = true;
      }
      if (updatePos) {
        this.curFig.updateAbsolutePosition();
      }
      near = [2.25, 0.5];
      far = [3.5, 0.5];
      self = [0, 0];
      cur = this.camFar ? far : near;
      cam.setTarget(this.curFig.head.getAbsolutePosition());
      cam.Pos.Z = -cur[0];
      cam.updateAbsolutePosition();
      this.debugOutput.setText("X=" + (parseInt(this.curFig.Pos.X)) + " Y=" + (parseInt(this.curFig.Pos.Y)) + " Z=" + (parseInt(this.curFig.Pos.Z)) + " R=" + this.curFig.Rot.Y);
      r.setWorld(this.getAbsoluteTransformation());
      return UniverseSceneNode.__super__.render.call(this, r);
    };
    return UniverseSceneNode;
  })();
}).call(this);
