(function() {
  /*
  Auto-generated from Core/Controls/LinkButton.ctl
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
  smio.Packs_Core_Controls_LinkButton = (function() {
    __extends(Packs_Core_Controls_LinkButton, smio.Control);
    Packs_Core_Controls_LinkButton.prototype.renderTemplate = function() {
      var ret;
      ret = {
        a: {
          id: '',
          "class": this.args["class"] || '',
          href: this.args.href || smio.Control.util.jsVoid
        }
      };
      if (this.disabled) {
        ret.a.disabled = 'disabled';
      }
      if (this.args.labelText) {
        ret.a.text = [this.args.labelText];
      }
      return ret;
    };
    Packs_Core_Controls_LinkButton.prototype.coreDisable = function(disable) {
      return this.el.prop('disabled', disable);
    };
    Packs_Core_Controls_LinkButton.prototype.onLoad = function() {
      Packs_Core_Controls_LinkButton.__super__.onLoad.call(this);
      return this.el.click(__bind(function() {
        if (this.args.onClick && !(this.disabled || this.el.prop('disabled'))) {
          return this.args.onClick();
        }
      }, this));
    };
    function Packs_Core_Controls_LinkButton(client, parent, args) {
      Packs_Core_Controls_LinkButton.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_LinkButton");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_Controls_LinkButton;
  })();
}).call(this);
