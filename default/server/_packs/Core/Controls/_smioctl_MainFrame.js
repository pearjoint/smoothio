(function() {
  /*
  Auto-generated from Core/Controls/MainFrame.ctl
  */  var smio, smoothio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  require('../../../_jscript/shared/Control');
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_MainFrame = (function() {
    __extends(Packs_Core_Controls_MainFrame, smio.Control);
    Packs_Core_Controls_MainFrame.prototype.test = function() {
      var xy;
      return xy = "serverside";
    };
    function Packs_Core_Controls_MainFrame(client, parent, args) {
      this.renderHtml = __bind(this.renderHtml, this);      Packs_Core_Controls_MainFrame.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_MainFrame");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    Packs_Core_Controls_MainFrame.prototype.renderHtml = function($el) {
      var __r;
      if (!this._html) {
        __r = {
          ctls: [],
          m: []
        };
        __r.o = __r.m;
        __r.o.push("\n<div class=\"smio-main\" id=\"");
        __r.o.push(this.id());
        __r.o.push("\">\n\t");
        __r.o.push(this.renderTag("ctl", "Console", {
          id: 'ctop',
          topDown: true
        }));
        __r.o.push("\n\t<div class=\"smio-console smio-console-main\"></div>\n\t");
        __r.o.push(this.renderTag("ctl", "Console", {
          id: 'cbottom',
          topDown: false
        }));
        __r.o.push("\n</div>\n\n");
        this._html = __r.o.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_Controls_MainFrame;
  })();
}).call(this);
