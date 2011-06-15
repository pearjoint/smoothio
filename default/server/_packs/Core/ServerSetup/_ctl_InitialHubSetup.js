(function() {
  /*
  Auto-generated from Core/ServerSetup/InitialHubSetup.ctl
  */  var smio, smoothio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  require('../../../_jscript/shared/Control');
  smio = smoothio = global.smoothio;
  smio.Packs_Core_ServerSetup_InitialHubSetup = (function() {
    __extends(Packs_Core_ServerSetup_InitialHubSetup, smio.Control);
    Packs_Core_ServerSetup_InitialHubSetup.prototype.renderTemplate = function() {
      return {
        "div .smio-setup": {
          "id": '',
          "div .smio-setup-outer .smio-setup-outer-top": {
            "div.smio-setup-header": [this.r('nojs_title')],
            "div.smio-setup-header-desc": [this.r('nojs_desc')]
          }
        }
      };
    };
    function Packs_Core_ServerSetup_InitialHubSetup(client, parent, args) {
      Packs_Core_ServerSetup_InitialHubSetup.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_ServerSetup_InitialHubSetup.prototype.className = function() {
      return "Core_ServerSetup_InitialHubSetup";
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.classNamespace = function() {
      return "Core_ServerSetup";
    };
    return Packs_Core_ServerSetup_InitialHubSetup;
  })();
}).call(this);
