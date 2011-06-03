(function() {
  /*
  Auto-generated from Core/Controls/mainframe.ctl
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
  smio.Packs_Core_Controls_mainframe = (function() {
    __extends(Packs_Core_Controls_mainframe, smio.Control);
    function Packs_Core_Controls_mainframe() {
      Packs_Core_Controls_mainframe.__super__.constructor.apply(this, arguments);
    }
    Packs_Core_Controls_mainframe.prototype.test = function() {
      var xy;
      return xy = "serverside";
    };
    return Packs_Core_Controls_mainframe;
  })();
}).call(this);
