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
  smio.gfx.Engine = (function() {
    __extends(Engine, CL3D.CopperLicht);
    function Engine(cid) {
      this.updateCanvasSize = __bind(this.updateCanvasSize, this);
      this.isContextLost = __bind(this.isContextLost, this);
      this.handleMouseMove = __bind(this.handleMouseMove, this);
      this.handleKeyUp = __bind(this.handleKeyUp, this);
      this.handleKeyDown = __bind(this.handleKeyDown, this);
      this.isKeyPressed = __bind(this.isKeyPressed, this);
      this.getSightDistance = __bind(this.getSightDistance, this);      Engine.__super__.constructor.call(this, cid, false, 30, false);
      this.pressedKeys = [];
      if ((this.canvas = $("#" + cid)) && (this.initRenderer())) {
        this.updateCanvasSize();
        this.addScene(this.scene = new CL3D.Scene());
        this.scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 48));
        this.scene.getRootSceneNode().addChild(this.skyBox = new CL3D.SkyBoxSceneNode());
        this.skyBox.getMaterial(5).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/stars.jpg', true);
        this.skyBox.getMaterial(4).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skxup.jpg', true);
        this.skyBox.getMaterial(0).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skx1.jpg', true);
        this.skyBox.getMaterial(2).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skx3.jpg', true);
        this.skyBox.getMaterial(1).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skx2.jpg', true);
        this.skyBox.getMaterial(3).Tex1 = this.getTextureManager().getTexture('/_/file/images/textures/skx0.jpg', true);
        this.scene.getRootSceneNode().addChild(this.universe = new smio.gfx.UniverseSceneNode(this));
        this.scene.setActiveCamera(this.universe.cam);
        this.universe.camSettings(this.canvas.prop('width') / this.canvas.prop('height'), CL3D.degToRad(45), this.getSightDistance(20), 1);
      }
    }
    Engine.prototype.createVertex = function(x, y, z, s, t) {
      var v;
      v = new CL3D.Vertex3D(true);
      v.Pos.X = x;
      v.Pos.Y = y;
      v.Pos.Z = z;
      v.TCoords.X = s;
      v.TCoords.Y = t;
      return v;
    };
    Engine.prototype.getSightDistance = function(eyeHeight) {
      return Math.sqrt((2 * smio.gfx.UniverseSceneNode.consts.earthRadius * eyeHeight) + (eyeHeight * eyeHeight));
    };
    Engine.prototype.isKeyPressed = function(keyCode) {
      if (!(keyCode != null)) {
        return this.pressedKeys.length;
      } else {
        return _.contains(this.pressedKeys, keyCode);
      }
    };
    Engine.prototype.handleKeyDown = function(e) {
      var c;
      document.title = e.keyCode + '';
      if (!_.contains(this.pressedKeys, e.keyCode)) {
        this.pressedKeys.push(e.keyCode);
      }
      if ((c = String.fromCharCode(e.keyCode)) && (c = c.toUpperCase())) {
        if (c === 'C') {
          this.universe.camFar = !this.universe.camFar;
        }
      }
      return Engine.__super__.handleKeyDown.call(this, e);
    };
    Engine.prototype.handleKeyUp = function(e) {
      if (_.contains(this.pressedKeys, e.keyCode)) {
        this.pressedKeys = _.without(this.pressedKeys, e.keyCode);
      }
      return Engine.__super__.handleKeyUp.call(this, e);
    };
    Engine.prototype.handleMouseMove = function(e) {
      this.universe.mouseLook = true;
      return Engine.__super__.handleMouseMove.call(this, e);
    };
    Engine.prototype.isContextLost = function() {
      return this.getRenderer().getWebGL().isContextLost;
    };
    Engine.prototype.updateCanvasSize = function() {
      var height, width, _ref;
      _ref = [this.canvas.width(), this.canvas.height()], width = _ref[0], height = _ref[1];
      return this.canvasSize = {
        w: width,
        h: height,
        w2: width / 2,
        w4: width / 4,
        h22: height / 2.2,
        h15: height / 1.5
      };
    };
    return Engine;
  })();
}).call(this);
