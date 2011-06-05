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
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_SlidePanel = (function() {
    __extends(Packs_Core_Controls_SlidePanel, smio.Control);
    Packs_Core_Controls_SlidePanel.prototype.init = function() {
      this.curItem = 0;
      this.items = [];
      Packs_Core_Controls_SlidePanel.__super__.init.call(this);
      return this.ctlRenderers['item'] = __bind(function(className, args) {
        this.items.push(args.id);
        return "<li class=\"" + this.args.itemClass + " " + args["class"] + "\" id=\"" + (this.id('items_' + args.id)) + "\">" + (this.renderTag("inner", null, args)) + "</li>";
      }, this);
    };
    Packs_Core_Controls_SlidePanel.prototype.onLoad = function() {
      return this.scrollTo(0, true);
    };
    Packs_Core_Controls_SlidePanel.prototype.onWindowResize = function(w, h) {
      return this.scrollTo(this.curItem, true);
    };
    Packs_Core_Controls_SlidePanel.prototype.scrollTo = function(item, force) {
      var el, el2, w;
      if (_.isString(item)) {
        item = this.items.indexOf(item);
      }
      if (item >= 0 && (force || item !== this.curItem)) {
        this.curItem = item;
        w = $("#" + (this.id('scrollprev'))).width();
        el = $("#" + (this.id('scrollbox')));
        el2 = $("#" + (this.id('before')));
        return morpheus.tween(250, (__bind(function(pos) {
          return el.scrollLeft(pos);
        }, this)), (function() {}), null, el.scrollLeft(), el.scrollLeft() + $("#" + (this.id('items_' + this.items[item]))).position().left - w);
      }
    };
    function Packs_Core_Controls_SlidePanel(client, parent, args) {
      Packs_Core_Controls_SlidePanel.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_SlidePanel");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    Packs_Core_Controls_SlidePanel.prototype.renderHtml = function($el) {
      var __r;
      if (!this._html) {
        __r = {
          ctls: [],
          m: []
        };
        __r.o = __r.m;
        __r.o.push("\n<div id=\"");
        __r.o.push(this.id());
        __r.o.push("\" class=\"smio-slidepanel ");
        __r.o.push(this.args["class"]);
        __r.o.push("\">\n\t<div id=\"");
        __r.o.push(this.id('scrollprev'));
        __r.o.push("\" class=\"smio-slidepanel-edge smio-slidepanel-edge-left\"></div>\n\t<div id=\"");
        __r.o.push(this.id('scrollnext'));
        __r.o.push("\" class=\"smio-slidepanel-edge smio-slidepanel-edge-right\"></div>\n\t<div id=\"");
        __r.o.push(this.id('scrollbox'));
        __r.o.push("\" class=\"smio-slidepanel-scrollbox\">\n\t<ul id=\"");
        __r.o.push(this.id('items'));
        __r.o.push("\" class=\"smio-slidepanel ");
        __r.o.push(this.args["class"]);
        __r.o.push("\">\n\t\t<li class=\"" + this.args.itemClass + "\" id=\"" + (this.id('before')) + "\">&nbsp;</li>\n\t\t");
        __r.o.push(this.renderTag("inner", "", null));
        __r.o.push("\n\t\t<li class=\"" + this.args.itemClass + "\" id=\"" + (this.id('after')) + "\">&nbsp;</li>\n\t</ul>\n\t</div>\n</div>\n\n");
        this._html = __r.o.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_Controls_SlidePanel;
  })();
}).call(this);
