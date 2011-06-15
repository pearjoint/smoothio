(function() {
  /*
  Auto-generated from Core/Controls/Toggles.ctl
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
  smio.Packs_Core_Controls_Toggles = (function() {
    __extends(Packs_Core_Controls_Toggles, smio.Control);
    Packs_Core_Controls_Toggles.prototype.renderTemplate = function() {
      var item, itemID, span, _ref;
      span = {
        id: ''
      };
      if (this.args.items) {
        _ref = this.args.items;
        for (itemID in _ref) {
          item = _ref[itemID];
          while (_.startsWith(itemID, '#')) {
            itemID = itemID.substr(1);
          }
          if (!item['toggleName']) {
            item.toggleName = this.id('toggle');
          }
          if (this.args.disabled) {
            item.disabled = this.args.disabled;
          }
          span["Toggle #" + itemID] = item;
        }
      }
      return {
        span: span
      };
    };
    function Packs_Core_Controls_Toggles(client, parent, args) {
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_Toggles.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_Toggles.prototype.className = function() {
      return "Core_Controls_Toggles";
    };
    Packs_Core_Controls_Toggles.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_Toggles;
  })();
}).call(this);
