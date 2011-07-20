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
            'div .smio-mapctl .d1': {
              'span .tmp1': {
                _: ['Lon/X: ']
              },
              'input #lon .smio-textinput': {
                type: 'text',
                value: '13.40722'
              },
              'br .br1': {
                html: ['']
              },
              'span .tmp2': {
                _: ['Lat/Y: ']
              },
              'input #lat .smio-textinput': {
                type: 'text',
                value: '52.5260'
              },
              'br .br2': {
                html: ['']
              },
              'LinkButton #l2x': {
                labelRawText: ' [Go2LonLat] ',
                onClick: __bind(function() {
                  return this.engine.universe.curFig.goTo(parseFloat(this.sub('lon').val()), parseFloat(this.sub('lat').val()), true);
                }, this)
              },
              'LinkButton #x2l': {
                labelRawText: ' [Go2XZ] ',
                onClick: __bind(function() {
                  return this.engine.universe.curFig.goTo(parseFloat(this.sub('lon').val()), parseFloat(this.sub('lat').val()));
                }, this)
              }
            },
            'div .smio-mapctl .d2': {
              'div .r1': {
                'img #map00 .smio-mapsectortile': {
                  src: '/_/file/images/textures/particle.png'
                },
                'img #map10 .smio-mapsectortile': {
                  src: '/_/file/images/textures/particle.png'
                },
                'img #map20 .smio-mapsectortile': {
                  src: '/_/file/images/textures/particle.png'
                }
              },
              'div .r2': {
                'img #map01 .smio-mapsectortile': {
                  src: '/_/file/images/textures/particle.png'
                },
                'img #map11 .smio-mapsectortile': {
                  src: '/_/file/images/textures/particle.png'
                },
                'img #map21 .smio-mapsectortile': {
                  src: '/_/file/images/textures/particle.png'
                }
              },
              'div .r3': {
                'img #map02 .smio-mapsectortile': {
                  src: '/_/file/images/textures/particle.png'
                },
                'img #map12 .smio-mapsectortile': {
                  src: '/_/file/images/textures/particle.png'
                },
                'img #map22 .smio-mapsectortile': {
                  src: '/_/file/images/textures/particle.png'
                }
              }
            },
            'div .smio-mapctl .d3': {
              'img #mapimg .smio-mapsectorbigtile': {
                src: '/_/file/images/textures/particle.png'
              }
            }
          }
        }
      };
    };
    Packs_Core_Earth_MainFrame.prototype.onLoad = function() {
      Packs_Core_Earth_MainFrame.__super__.onLoad.call(this);
      this.engine = new smio.gfx.Engine(this, this.id('c3d'));
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
