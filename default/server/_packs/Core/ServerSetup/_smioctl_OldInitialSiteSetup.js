(function() {
  /*
  Auto-generated from Core/ServerSetup/OldInitialSiteSetup.ctl
  */  var smio, smoothio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  require('../../../_jscript/Control');
  smio = smoothio = global.smoothio;
  smio.Packs_Core_ServerSetup_OldInitialSiteSetup = (function() {
    __extends(Packs_Core_ServerSetup_OldInitialSiteSetup, smio.Control);
    function Packs_Core_ServerSetup_OldInitialSiteSetup() {
      Packs_Core_ServerSetup_OldInitialSiteSetup.__super__.constructor.apply(this, arguments);
    }
    Packs_Core_ServerSetup_OldInitialSiteSetup.prototype.onSlide = function(index, itemID) {
      return this.controls.steptabs.selectTab(itemID);
    };
    Packs_Core_ServerSetup_OldInitialSiteSetup.prototype.onTabSelect = function(tabID) {
      return this.controls.stepslide.scrollTo(tabID);
    };
    return Packs_Core_ServerSetup_OldInitialSiteSetup;
  })();
}).call(this);
