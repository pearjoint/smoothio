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
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_Carousel = (function() {
    __extends(Packs_Core_Controls_Carousel, smio.Control);
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
    function Packs_Core_Controls_Carousel(client, parent, args) {
      Packs_Core_Controls_Carousel.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_Carousel");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    Packs_Core_Controls_Carousel.prototype.renderHtml = function($el) {
      var __r;
      if (!this._html) {
        __r = {
          ctls: [],
          m: [],
          o: null
        };
        __r.o = __r.m;
        __r.o.push("\n<div id=\"");
        __r.o.push(this.id());
        __r.o.push("\" class=\"smio-carousel\">\n\t<ul id=\"");
        __r.o.push(this.id('ul'));
        __r.o.push("\" class=\"smio-carousel\">\n\t\t");
        __r.o.push(this.renderTag("inner", "", null));
        __r.o.push("\n\t</ul>\n</div>\n\n");
        this._html = __r.o.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_Controls_Carousel;
  })();
}).call(this);
