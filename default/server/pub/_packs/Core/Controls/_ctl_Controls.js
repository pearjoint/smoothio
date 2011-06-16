(function() {
  /*
  Auto-generated from Core/Controls/Controls.ctl
  */  var smio, smoothio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_Controls = (function() {
    __extends(Packs_Core_Controls_Controls, smio.Control);
    Packs_Core_Controls_Controls.prototype.renderTemplate = function() {
      var an, av, it, item, itemID, items, nocopy, span, _i, _len, _ref, _ref2;
      nocopy = ['ctltype', 'items', 'id', 'class'];
      span = {
        id: ''
      };
      if (this.args.items) {
        if (_.isArray(this.args.items)) {
          items = {};
          _ref = this.args.items;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            it = _ref[_i];
            items[it] = {};
          }
        } else {
          items = this.args.items;
        }
        for (itemID in items) {
          item = items[itemID];
          while (_.startsWith(itemID, '#')) {
            itemID = itemID.substr(1);
          }
          _ref2 = this.args;
          for (an in _ref2) {
            av = _ref2[an];
            if ((!(__indexOf.call(nocopy, an) >= 0)) && (!(item[an] != null))) {
              item[an] = _.isFunction(av) ? av(itemID) : av;
            }
          }
          span["" + this.args.ctltype + " #" + itemID] = item;
        }
      }
      return {
        span: span
      };
    };
    function Packs_Core_Controls_Controls(client, parent, args) {
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_Controls.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_Controls.prototype.className = function() {
      return "Core_Controls_Controls";
    };
    Packs_Core_Controls_Controls.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_Controls;
  })();
}).call(this);
