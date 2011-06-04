(function() {
  /*
  Auto-generated from Core/Controls/SwipeBehavior.ctl
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
  smio.Packs_Core_Controls_SwipeBehavior = (function() {
    __extends(Packs_Core_Controls_SwipeBehavior, smio.Control);
    Packs_Core_Controls_SwipeBehavior.prototype.onLoad = function() {
      Packs_Core_Controls_SwipeBehavior.__super__.onLoad.call(this);
      return this.el.addClass('smio-swipebehavior');
    };
    function Packs_Core_Controls_SwipeBehavior(client, parent, args) {
      Packs_Core_Controls_SwipeBehavior.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_SwipeBehavior");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    Packs_Core_Controls_SwipeBehavior.prototype.renderHtml = function($el) {
      var __o;
      if (!this._html) {
        __o = [];
        __o.push("\n\n");
        this._html = __o.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_Controls_SwipeBehavior;
  })();
}).call(this);
