(function() {
  /*
  Auto-generated from Core/Controls/Console.ctl
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
  smio.Packs_Core_Controls_Console = (function() {
    __extends(Packs_Core_Controls_Console, smio.Control);
    Packs_Core_Controls_Console.prototype.init = function() {};
    Packs_Core_Controls_Console.prototype.onLoad = function($el) {
      Packs_Core_Controls_Console.__super__.onLoad.call(this);
      if (!this.args['topDown']) {
        $("#" + (this.id()) + "_detail").insertBefore("#" + (this.id()) + "_ever");
        return $("#" + (this.id()) + "_hover").insertBefore("#" + (this.id()) + "_ever");
      }
    };
    function Packs_Core_Controls_Console(client, parent, args) {
      this.renderHtml = __bind(this.renderHtml, this);
      this.onLoad = __bind(this.onLoad, this);
      this.init = __bind(this.init, this);      Packs_Core_Controls_Console.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_Console.prototype.className = function() {
      return "Core_Controls_Console";
    };
    Packs_Core_Controls_Console.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    Packs_Core_Controls_Console.prototype.renderHtml = function($el) {
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
      __r.p("\n<div id=\"");
      __r.p(this.id());
      __r.p("\" class=\"smio-console smio-console-");
      __r.p(this.args['topDown'] ? 'top' : 'bottom');
      __r.p("\">\n\t<div id=\"");
      __r.p(this.id());
      __r.p("_ever\" class=\"smio-console-ever\">header</div>\n\t<div id=\"");
      __r.p(this.id());
      __r.p("_hover\" class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div id=\"");
      __r.p(this.id());
      __r.p("_detail\" class=\"smio-console-detail\" style=\"display: none;\">details</div>\n</div>\n\n");
      _html = __r.o.join('');
      if ($el) {
        $el.html(_html);
      }
      return _html;
    };
    return Packs_Core_Controls_Console;
  })();
}).call(this);
