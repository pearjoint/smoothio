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
        'div .smio-invwarndetails .smio-fade': {
          id: '',
          'div .smio-invwarndetails-edge': {
            'div .smio-invwarndetails-arr': {
              html: ['&nbsp;']
            }
          },
          'div .smio-invwarndetails-box': {
            'div .smio-invwarndetails-inner': {
              html: ['Last attempted <i>5 minutes ago</i>:<br/><br/><b>This server already contains a Hub. Try a complete reload (CTRL+R).</b><br/><br/>Retry or Cancel']
            }
          }
        }
      };
    };
    function Packs_Core_Controls_InvokeWarningPopup(client, parent, args) {
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
