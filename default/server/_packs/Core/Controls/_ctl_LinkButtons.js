(function() {
  /*
  Auto-generated from Core/Controls/LinkButtons.ctl
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
  smio.Packs_Core_Controls_LinkButtons = (function() {
    __extends(Packs_Core_Controls_LinkButtons, smio.Control);
    Packs_Core_Controls_LinkButtons.prototype.renderTemplate = function() {
      return {
        'div': {
          html: 'retry or cancel'
        }
      };
    };
    function Packs_Core_Controls_LinkButtons(client, parent, args) {
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_LinkButtons.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_LinkButtons.prototype.className = function() {
      return "Core_Controls_LinkButtons";
    };
    Packs_Core_Controls_LinkButtons.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_LinkButtons;
  })();
}).call(this);
