(function() {
  /*
  Auto-generated from Core/Controls/TabStrip.ctl
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
  smio.Packs_Core_Controls_TabStrip = (function() {
    __extends(Packs_Core_Controls_TabStrip, smio.Control);
    Packs_Core_Controls_TabStrip.prototype.renderTemplate = function() {
      var is1st, makeOnClick, ret, tab, _i, _len, _ref;
      ret = {
        div: {
          id: '',
          "class": this.args["class"] || ''
        }
      };
      makeOnClick = __bind(function(tabID) {
        return __bind(function() {
          return this.selectTab(tabID);
        }, this);
      }, this);
      is1st = true;
      _ref = this.args.tabs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tab = _ref[_i];
        ret.div["LinkButton #" + tab + " ." + this.args.tabClass + " ." + (this.args.tabClass + (is1st ? '-active' : '-inactive'))] = {
          labelText: [this.r(this.args.resPrefix + tab)],
          onClick: makeOnClick(tab)
        };
        is1st = false;
      }
      return ret;
    };
    Packs_Core_Controls_TabStrip.prototype.selectTab = function(tabID) {
      var a, cls, t, uncls, _i, _len, _ref;
      a = this.sub(tabID);
      cls = "" + this.args.tabClass + "-active";
      uncls = "" + this.args.tabClass + "-inactive";
      if (!a.hasClass(cls)) {
        _ref = this.args.tabs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          this.sub(t).removeClass(cls).addClass(uncls);
        }
        a.removeClass(uncls).addClass(cls);
        if (this.args.onTabSelect) {
          return this.args.onTabSelect(tabID);
        }
      }
    };
    function Packs_Core_Controls_TabStrip(client, parent, args) {
      this.selectTab = __bind(this.selectTab, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_TabStrip.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_TabStrip.prototype.className = function() {
      return "Core_Controls_TabStrip";
    };
    Packs_Core_Controls_TabStrip.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_TabStrip;
  })();
}).call(this);
