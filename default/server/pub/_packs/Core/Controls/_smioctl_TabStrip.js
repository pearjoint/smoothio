(function() {
  /*
  Auto-generated from Core/Controls/TabStrip.ctl
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
  smio.Packs_Core_Controls_TabStrip = (function() {
    __extends(Packs_Core_Controls_TabStrip, smio.Control);
    Packs_Core_Controls_TabStrip.prototype.onLoad = function() {
      var makeHandler, t, _i, _len, _ref, _results;
      Packs_Core_Controls_TabStrip.__super__.onLoad.call(this);
      _ref = this.args.tabs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        makeHandler = __bind(function(tabID) {
          return __bind(function() {
            return this.selectTab(tabID);
          }, this);
        }, this);
        _results.push($("#" + this.ctlID + "_" + t).click(makeHandler(t)));
      }
      return _results;
    };
    Packs_Core_Controls_TabStrip.prototype.selectTab = function(tabID) {
      var a, cls, incls, t, _i, _len, _ref;
      a = $("#" + this.ctlID + "_" + tabID);
      cls = "" + this.args.tabClass + "-active";
      incls = "" + this.args.tabClass + "-inactive";
      if (!a.hasClass(cls)) {
        _ref = this.args.tabs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          $("#" + this.ctlID + "_" + t).removeClass(cls).addClass(incls);
        }
        return a.removeClass(incls).addClass(cls);
      }
    };
    function Packs_Core_Controls_TabStrip(client, parent, args) {
      Packs_Core_Controls_TabStrip.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_TabStrip");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    Packs_Core_Controls_TabStrip.prototype.renderHtml = function($el) {
      var firstDone, tab, __o, _i, _len, _ref;
      if (!this._html) {
        __o = [];
        __o.push("\n<div id=\"");
        __o.push(this.ctlID);
        __o.push("\" class=\"");
        __o.push(this.renderTag("arg", "class", null));
        __o.push("\">\n");
        firstDone = false;
        _ref = this.args.tabs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tab = _ref[_i];
          __o.push("\n\t\t<a href=\"javascript:void(0);\" id=\"");
          __o.push(this.id(tab));
          __o.push("\" class=\"");
          __o.push(this.renderTag("arg", "tabClass", null));
          __o.push(" ");
          __o.push(this.args.tabClass + (firstDone ? '-inactive' : '-active'));
          __o.push("\">");
          __o.push(this.res(this.args.resPrefix + tab));
          __o.push("</a>\n\t\t");
          if (!firstDone) {
            firstDone = true;
          }
        }
        __o.push("\n</div>\n\n");
        this._html = __o.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_Controls_TabStrip;
  })();
}).call(this);
