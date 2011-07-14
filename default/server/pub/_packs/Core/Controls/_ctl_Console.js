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
    Packs_Core_Controls_Console.prototype.renderTemplate = function() {
      return {
        div: {
          id: '',
          "class": "smio-console smio-console-" + (this.args['topDown'] ? 'top' : 'bottom'),
          'div #ever .smio-console-ever': {
            _: ['Zeh Header']
          },
          'div #hover': {
            _: ['Zeh Hovva']
          },
          'div #detail': {
            _: ['Zeh Details']
          }
        }
      };
    };
    Packs_Core_Controls_Console.prototype.onLoad = function($el) {
      Packs_Core_Controls_Console.__super__.onLoad.call(this);
      if (!this.args['topDown']) {
        $("#" + (this.id('detail'))).insertBefore("#" + (this.id('ever')));
        return $("#" + (this.id('hover'))).insertBefore("#" + (this.id('ever')));
      }
    };
    function Packs_Core_Controls_Console(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_Console.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_Console.prototype.className = function() {
      return "Core_Controls_Console";
    };
    Packs_Core_Controls_Console.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_Console;
  })();
}).call(this);
