(function() {
  /*
  Auto-generated from Core/Controls/SlidePanel.ctl
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
  smio.Packs_Core_Controls_SlidePanel = (function() {
    __extends(Packs_Core_Controls_SlidePanel, smio.Control);
    function Packs_Core_Controls_SlidePanel(client, parent, args) {
      Packs_Core_Controls_SlidePanel.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_SlidePanel.prototype.className = function() {
      return "Core_Controls_SlidePanel";
    };
    Packs_Core_Controls_SlidePanel.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_SlidePanel;
  })();
}).call(this);
