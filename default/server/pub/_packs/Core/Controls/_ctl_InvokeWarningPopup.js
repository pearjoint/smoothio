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
      var noQuote;
      noQuote = _.any(this.args.errs, function(e) {
        return e === smio.resources.smoothio.timeout;
      });
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
              title: this.r('close'),
              html: ['&times;']
            },
            'div .smio-invwarn-inner': {
              'div .smio-invwarn-intro': {
                'span .__1': {
                  html: [this.r('invwarn_lasttried1')]
                },
                'NatLangTime #dt': {
                  dt: this.args.invCtl.invtime
                },
                'span .__2': {
                  html: [this.r('invwarn_lasttried2')]
                }
              },
              'div .smio-invwarn-msg': smio.Util.Array.toObject(this.args.errs, (function(v, i) {
                return "div .smio-invwarn-msg-" + (noQuote ? 'noquote' : 'quote') + " .__" + i;
              }), (function(v) {
                return {
                  html: [v]
                };
              })),
              'LinkButtons #btns .smio-invwarn-btns .smio-bigbutton-strip': {
                btnClass: 'smio-bigbutton',
                items: {
                  'retry': {
                    labelRawHtml: "<span class=\"smio-invbtn-icon smio-invbtn-retry\">&#x27A5;</span> " + (this.r('invwarn_retry')),
                    onClick: __bind(function() {
                      if (this.args.invCtl && this.args.invCtl.el && !this.isDisabled()) {
                        return this.args.invCtl.el.click();
                      }
                    }, this)
                  },
                  'cancel': {
                    labelRawHtml: "<span class=\"smio-invbtn-icon smio-invbtn-cancel\">&#x2718;</span> " + (this.r('invwarn_cancel')),
                    onClick: __bind(function() {
                      if (this.args.invCtl && !this.isDisabled()) {
                        return this.args.invCtl.resetInvoke();
                      }
                    }, this)
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
    Packs_Core_Controls_InvokeWarningPopup.prototype.isDisabled = function() {
      return this.disabled || this.sub('close').prop('disabled');
    };
    Packs_Core_Controls_InvokeWarningPopup.prototype.onLoad = function() {
      Packs_Core_Controls_InvokeWarningPopup.__super__.onLoad.call(this);
      return this.sub('close').click(__bind(function() {
        if (!this.isDisabled()) {
          return this.removeControl();
        }
      }, this));
    };
    function Packs_Core_Controls_InvokeWarningPopup(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.isDisabled = __bind(this.isDisabled, this);
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
