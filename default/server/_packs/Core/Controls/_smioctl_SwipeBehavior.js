(function() {
  /*
  Auto-generated from Core/Controls/SwipeBehavior.ctl
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
  smio.Packs_Core_Controls_SwipeBehavior = (function() {
    __extends(Packs_Core_Controls_SwipeBehavior, smio.Control);
    function Packs_Core_Controls_SwipeBehavior() {
      Packs_Core_Controls_SwipeBehavior.__super__.constructor.apply(this, arguments);
    }
    Packs_Core_Controls_SwipeBehavior.prototype.onLoad = function() {
      Packs_Core_Controls_SwipeBehavior.__super__.onLoad.call(this);
      return this.el.addClass('smio-swipebehavior');
    };
    return Packs_Core_Controls_SwipeBehavior;
  })();
}).call(this);
