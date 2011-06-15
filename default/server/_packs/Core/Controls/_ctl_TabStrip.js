(function() {
  /*
  Auto-generated from Core/Controls/TabStrip.ctl
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
  smio.Packs_Core_Controls_TabStrip = (function() {
    __extends(Packs_Core_Controls_TabStrip, smio.Control);
    function Packs_Core_Controls_TabStrip(client, parent, args) {
      Packs_Core_Controls_TabStrip.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_TabStrip.prototype.className = function() {
      return "Core_Controls_TabStrip";
    };
    Packs_Core_Controls_TabStrip.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_TabStrip;
  })();
}).call(this);
