(function() {
  /*
  Auto-generated from Core/Controls/Toggles.ctl
  */  var smio, smoothio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
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
          if (this.args.type === 'bullets') {
            item.checked = true;
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
      Packs_Core_Controls_Toggles.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_Toggles");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_Controls_Toggles;
  })();
}).call(this);
