(function() {
  /*
  Auto-generated from Core/Controls/InvokeWarningPopup.ctl
  */  var smio, smoothio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_InvokeWarningPopup = (function() {
    __extends(Packs_Core_Controls_InvokeWarningPopup, smio.Control);
    Packs_Core_Controls_InvokeWarningPopup.prototype.renderTemplate = function() {
      return {
        'div .smio-invwarn .smio-fade': {
          id: '',
          'div .smio-invwarn-edge': {
            'div .smio-invwarn-arr': {
              html: ['&nbsp;']
            }
          },
          'div .smio-invwarn-box': {
            'a #close .smio-invwarn-close': {
              href: smio.Control.util.jsVoid,
              html: ['&times;']
            },
            'div .smio-invwarn-inner': {
              'div .smio-invwarn-intro': {
                html: ['Last attempted <i>5 minutes ago</i>:']
              },
              'div .smio-invwarn-msg': {
                html: ['This server already contains a Hub. Try a complete reload (CTRL+R).']
              },
              'LinkButtons #btns .smio-invwarn-btns .smio-bigbutton-strip': {
                btnClass: 'smio-bigbutton',
                items: {
                  'retry': {
                    labelRawHtml: '<span class="smio-invbtn-icon smio-invbtn-retry">&#x27A5;</span> Neuer Versuch'
                  },
                  'cancel': {
                    labelRawHtml: '<span class="smio-invbtn-icon smio-invbtn-cancel">&#x2718;</span> Abbrechen'
                  }
                }
              }
            }
          }
        }
      };
    };
    Packs_Core_Controls_InvokeWarningPopup.prototype.coreDisable = function(disable) {
      return this.sub('close').css({
        display: disable ? 'none' : 'inline-block'
      }).prop('disabled', disable);
    };
    Packs_Core_Controls_InvokeWarningPopup.prototype.onLoad = function() {
      Packs_Core_Controls_InvokeWarningPopup.__super__.onLoad.call(this);
      return this.sub('close').click(__bind(function() {
        if (!(this.disabled || this.sub('close').prop('disabled'))) {
          return this.removeControl();
        }
      }, this));
    };
    function Packs_Core_Controls_InvokeWarningPopup(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_InvokeWarningPopup.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_InvokeWarningPopup.prototype.className = function() {
      return "Core_Controls_InvokeWarningPopup";
    };
    Packs_Core_Controls_InvokeWarningPopup.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_InvokeWarningPopup;
  })();
}).call(this);
