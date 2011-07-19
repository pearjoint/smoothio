(function() {
  /*
  Auto-generated from Core/Earth/MainFrame.ctl
  */  var smio, smoothio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  require('../../../_jscript/shared/Control');
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Earth_MainFrame = (function() {
    __extends(Packs_Core_Earth_MainFrame, smio.Control);
    Packs_Core_Earth_MainFrame.prototype.renderTemplate = function() {
      return {
        'div .smio-main': {
          id: '',
          'canvas #c3d .smio-canvas3d': {
            width: '672',
            height: '420',
            html: ['']
          },
          'div #ctlpanel': {
            'span .tmp1': {
              _: ['Lat: ']
            },
            'input #lat .smio-textinput': {
              type: 'text',
              value: '52.52627'
            },
            'span .tmp2': {
              _: ['Long: ']
            },
            'input #long .smio-textinput': {
              type: 'text',
              value: '13.40722'
            }
          }
        }
      };
    };
    Packs_Core_Earth_MainFrame.prototype.onLoad = function() {
      Packs_Core_Earth_MainFrame.__super__.onLoad.call(this);
      this.engine = new smio.gfx.Engine(this.id('c3d'));
      return this.onWindowResize(this.client.pageWindow.width(), this.client.pageWindow.height());
    };
    Packs_Core_Earth_MainFrame.prototype.onSleepy = function(sleepy) {
      if (sleepy) {
        return this.engine.pressedKeys = [];
      }
    };
    Packs_Core_Earth_MainFrame.prototype.onWindowResize = function(w, h) {
      this.engine.canvas.width(w).height(h - this.sub('ctlpanel').height());
      this.engine.canvas.prop('width', w / 2).prop('height', (h - this.sub('ctlpanel').height()) / 2);
      this.engine.universe.camSettings(w / h, CL3D.degToRad(70));
      return this.engine.updateCanvasSize();
    };
    function Packs_Core_Earth_MainFrame(client, parent, args) {
      this.onWindowResize = __bind(this.onWindowResize, this);
      this.onSleepy = __bind(this.onSleepy, this);
      this.onLoad = __bind(this.onLoad, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Earth_MainFrame.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Earth_MainFrame.prototype.className = function() {
      return "Core_Earth_MainFrame";
    };
    Packs_Core_Earth_MainFrame.prototype.classNamespace = function() {
      return "Core_Earth";
    };
    return Packs_Core_Earth_MainFrame;
  })();
}).call(this);
