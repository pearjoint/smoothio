(function() {
  /*
  Auto-generated from SmoothioCore/CommonControls/mainframe.ctl
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
  smio.Packs_SmoothioCore_CommonControls_mainframe = (function() {
    __extends(Packs_SmoothioCore_CommonControls_mainframe, smio.Control);
    function Packs_SmoothioCore_CommonControls_mainframe() {
      Packs_SmoothioCore_CommonControls_mainframe.__super__.constructor.apply(this, arguments);
    }
    Packs_SmoothioCore_CommonControls_mainframe.prototype.test = function() {
      var xy;
      return xy = "serverside";
    };
    return Packs_SmoothioCore_CommonControls_mainframe;
  })();
}).call(this);
