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
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_MainFrame = (function() {
    __extends(Packs_Core_Controls_MainFrame, smio.Control);
    Packs_Core_Controls_MainFrame.prototype.test = function() {
      var xy;
      return xy = "clientside";
    };
    function Packs_Core_Controls_MainFrame(client, parent, args) {
      this.renderHtml = __bind(this.renderHtml, this);      Packs_Core_Controls_MainFrame.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_MainFrame.prototype.className = function() {
      return "Core_Controls_MainFrame";
    };
    Packs_Core_Controls_MainFrame.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    Packs_Core_Controls_MainFrame.prototype.renderHtml = function($el) {
      var __r, _html;
      __r = {
        ctls: [],
        m: []
      };
      __r.p = (function(r) {
        return function(v) {
          return r.o.push(v);
        };
      })(__r);
      __r.o = __r.m;
      __r.p("\n<div class=\"smio-main\" id=\"");
      __r.p(this.id());
      __r.p("\">\n\t");
      __r.p(this.renderTag("ctl", "Console", {
        id: 'ctop',
        topDown: true
      }));
      __r.p("\n\t<div class=\"smio-console smio-console-main\"></div>\n\t");
      __r.p(this.renderTag("ctl", "Console", {
        id: 'cbottom',
        topDown: false
      }));
      __r.p("\n</div>\n\n");
      _html = __r.o.join('');
      if ($el) {
        $el.html(_html);
      }
      return _html;
    };
    return Packs_Core_Controls_MainFrame;
  })();
}).call(this);
