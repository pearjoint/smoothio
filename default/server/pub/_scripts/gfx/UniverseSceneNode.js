(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.gfx.UniverseSceneNode = (function() {
    UniverseSceneNode.consts = {
      astroDist: 149597870700,
      earthDist: 49500000,
      earthRadius: 6378100,
      moonDist: 356400000,
      moonRadius: 1738140,
      sunRadius: 697000000
    };
    function UniverseSceneNode(engine, figX, figY, figZ) {
      this.engine = engine;
      if (figX == null) {
        figX = 1492484;
      }
      if (figY == null) {
        figY = 0;
      }
      if (figZ == null) {
        figZ = 6895797;
      }
      this.render = __bind(this.render, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      this.camSettings = __bind(this.camSettings, this);
      UniverseSceneNode.__super__.constructor.call(this, this.engine);
      this.init();
      this.addChild(this.debugOutput = new CL3D.Overlay2DSceneNode(this));
      this.debugOutput.set2DPosition(0, 0, 840, 12);
      this.debugOutput.setShowBackgroundColor(true, CL3D.createColor(128, 255, 255, 255));
      this.debugOutput.FontName = '8;default;arial;normal;normal;false';
      this.addChild(this.ground = new smio.gfx.GroundSceneNode(this.engine));
      this.addChild(this.fig1 = new smio.gfx.DummyAvatarSceneNode(this.engine, 'wood', figX + 2, 0, figZ + 2, 1.6));
      this.addChild(this.curFig = this.fig2 = new smio.gfx.DummyAvatarSceneNode(this.engine, 'roster', figX, figY, figZ, 1.9));
      this.fig2.addChild(this.cam = new CL3D.CameraSceneNode());
      this.cam.Pos.X = 0;
      this.cam.Pos.Y = this.curFig.head.Pos.Y;
      this.cam.Pos.Z = -3.5;
      this.cam.setTarget(this.curFig.head.getAbsolutePosition());
      this.cam.updateAbsolutePosition();
      this.camFar = true;
      this.busy = false;
      this.mouseLook = false;
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
    UniverseSceneNode.prototype.render = function(renderer) {
      var cam, cur, diff, far, finalz, headPos, mouseX, mouseY, moveDiff, moveDiffXZ, near, odiff, pi, prCtrl, prDown, prLeft, prRight, prShift, prTop, self, tpos, updatePos, xz, ydif, yval, zfromx, _ref;
      if (!this.busy) {
        this.busy = true;
        _ref = [false, Math.PI, this.cam, 0], updatePos = _ref[0], pi = _ref[1], cam = _ref[2], ydif = _ref[3];
        prLeft = this.engine.isKeyPressed(37);
        prTop = this.engine.isKeyPressed(38);
        prRight = this.engine.isKeyPressed(39);
        prDown = this.engine.isKeyPressed(40);
        prShift = this.engine.isKeyPressed(16);
        prCtrl = this.engine.isKeyPressed(17);
        moveDiff = function() {
          return 0.3 * (prShift ? 10 : 1);
        };
        moveDiffXZ = __bind(function(step, noFast) {
          var mult, rad;
          if (step == null) {
            step = 0.05;
          }
          rad = CL3D.degToRad(this.curFig.Rot.Y);
          mult = prShift && !noFast ? 44 : 1;
          return [Math.sin(rad) * step * mult, Math.cos(rad) * step * mult];
        }, this);
        if (prLeft && !prRight) {
          this.curFig.rotate(-3);
          updatePos = true;
        }
        if (prRight && !prLeft) {
          this.curFig.rotate(3);
          updatePos = true;
        }
        if (prTop && !prDown) {
          if (prCtrl) {
            this.curFig.Pos.Y += (ydif = moveDiff());
          } else {
            xz = moveDiffXZ();
            this.curFig.Pos.X += xz[0];
            this.curFig.Pos.Z += xz[1];
          }
          updatePos = true;
        }
        if (prDown && !prTop) {
          if (prCtrl) {
            this.curFig.Pos.Y += (ydif = -moveDiff());
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
        headPos = this.curFig.head.Pos;
        mouseX = this.engine.isMouseOverCanvas() && this.mouseLook ? -(this.engine.getMouseX() - this.engine.canvasSize.w2) : 0;
        mouseY = this.engine.isMouseOverCanvas() && this.mouseLook ? this.engine.getMouseY() - this.engine.canvasSize.h22 : 0;
        near = 2;
        far = 4;
        self = 0;
        cur = this.camFar ? far : near;
        cam.Pos.Y = headPos.Y + 0.5 + (mouseY === 0 ? 0 : (headPos.Y * 2) / (this.engine.canvasSize.h / mouseY));
        yval = (mouseY === 0 ? 0 : cur / (this.engine.canvasSize.h15 / Math.abs(mouseY)));
        odiff = this.engine.canvasSize.w4 - Math.abs(mouseX);
        diff = Math.abs(odiff);
        if (mouseX < 0) {
          cam.Pos.X = -cur + (diff === 0 ? 0 : cur / (this.engine.canvasSize.w4 / diff));
          if (odiff < 0) {
            zfromx = cur + cam.Pos.X;
          } else {
            zfromx = -cur - cam.Pos.X;
          }
        } else {
          cam.Pos.X = cur - (diff === 0 ? 0 : cur / (this.engine.canvasSize.w4 / diff));
          if (odiff < 0) {
            zfromx = cur - cam.Pos.X;
          } else {
            zfromx = -cur + cam.Pos.X;
          }
        }
        if (zfromx < 0) {
          if ((finalz = zfromx + yval) > 0) {
            finalz = 0;
          }
        } else {
          if ((finalz = zfromx - yval) < 0) {
            finalz = 0;
          }
        }
        cam.Pos.Z = finalz;
        tpos = this.curFig.head.getAbsolutePosition();
        cam.setTarget(new CL3D.Vect3d(tpos.X, tpos.Y - (cur === near ? 0.1 : 0.5), tpos.Z));
        cam.updateAbsolutePosition();
        this.debugOutput.setText("X=" + (parseInt(this.curFig.Pos.X)) + " Y=" + (parseInt(this.curFig.Pos.Y)) + " Z=" + (parseInt(this.curFig.Pos.Z)) + " R=" + this.curFig.Rot.Y + " Lon=" + this.curFig.posLon + " Lat=" + this.curFig.posLat);
        renderer.setWorld(this.getAbsoluteTransformation());
        UniverseSceneNode.__super__.render.call(this, renderer);
        return this.busy = false;
      }
    };
    return UniverseSceneNode;
  })();
}).call(this);
