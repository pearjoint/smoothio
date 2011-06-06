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
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require('../../../_jscript/Control');
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_SlidePanel = (function() {
    __extends(Packs_Core_Controls_SlidePanel, smio.Control);
    function Packs_Core_Controls_SlidePanel() {
      Packs_Core_Controls_SlidePanel.__super__.constructor.apply(this, arguments);
    }
    Packs_Core_Controls_SlidePanel.prototype.init = function() {
      this.curItem = 0;
      this.items = [];
      Packs_Core_Controls_SlidePanel.__super__.init.call(this);
      this.ctlRenderers['item'] = __bind(function(className, args) {
        this.items.push(args.id);
        return "<li class=\"" + this.args.itemClass + " " + args["class"] + "\" id=\"" + (this.id('items_' + args.id)) + "\">" + (this.renderTag("inner", null, args)) + "</li>";
      }, this);
      if (this.args.onItemSelect && _.isFunction(this.args.onItemSelect)) {
        return this.on('itemSelect', this.args.onItemSelect);
      }
    };
    Packs_Core_Controls_SlidePanel.prototype.onLoad = function() {
      (this.edgePrev = $("#" + (this.id('edgeprev')))).click(__bind(function() {
        return this.scrollTo(this.curItem - 1);
      }, this));
      (this.edgeNext = $("#" + (this.id('edgenext')))).click(__bind(function() {
        return this.scrollTo(this.curItem + 1);
      }, this));
      this.scrollBox = $("#" + (this.id('scrollbox')));
      return this.scrollTo(0, true);
    };
    Packs_Core_Controls_SlidePanel.prototype.onWindowResize = function(w, h) {
      return this.scrollTo(this.curItem, true);
    };
    Packs_Core_Controls_SlidePanel.prototype.scrollTo = function(item, force) {
      if (_.isString(item)) {
        item = this.items.indexOf(item);
      }
      if (((item < 0) || (item >= this.items.length)) && force) {
        item = 0;
      }
      if ((force || item !== this.curItem) && (item >= 0) && (item < this.items.length)) {
        this.edgePrev.css({
          display: item === 0 ? 'none' : 'block'
        });
        this.edgeNext.css({
          display: item === (this.items.length - 1) ? 'none' : 'block'
        });
        this.on('itemSelect', [this.curItem = item, this.items[item]]);
        return morpheus.tween(250, (__bind(function(pos) {
          return this.scrollBox.scrollLeft(pos);
        }, this)), (function() {}), null, this.scrollBox.scrollLeft(), this.scrollBox.scrollLeft() + $("#" + (this.id('items_' + this.items[item]))).position().left - this.edgePrev.width());
      }
    };
    return Packs_Core_Controls_SlidePanel;
  })();
}).call(this);
