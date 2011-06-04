(function() {
  /*
  Auto-generated from Core/Controls/Carousel.ctl
  */  var smio, smoothio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require('../../../_jscript/Control');
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_Carousel = (function() {
    __extends(Packs_Core_Controls_Carousel, smio.Control);
    function Packs_Core_Controls_Carousel() {
      Packs_Core_Controls_Carousel.__super__.constructor.apply(this, arguments);
    }
    Packs_Core_Controls_Carousel.prototype.init = function() {
      Packs_Core_Controls_Carousel.__super__.init.call(this);
      return this.ctlRenderers['item'] = __bind(function(className, args) {
        var content, itemID;
        itemID = this.id(args.id);
        content = this.renderTag("inner", null, args);
        return "<li id=\"" + itemID + "\">" + content + "</li>";
      }, this);
    };
    Packs_Core_Controls_Carousel.prototype.onLoad = function() {
      Packs_Core_Controls_Carousel.__super__.onLoad.call(this);
      return this.el[0].scrollLeft = 200;
    };
    return Packs_Core_Controls_Carousel;
  })();
}).call(this);
