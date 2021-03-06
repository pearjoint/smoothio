(function() {
  /*
  Auto-generated from Core/Controls/LinkButton.ctl
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
      if (this.args.invoke) {
        ret.a['span #inv .smio-inv'] = {
          html: [this.args.invoke.html + '']
        };
        ret.a['span .smio'] = {
          html: ['&nbsp;']
        };
      }
      ret.a.span = {};
      this.jsonTemplates_Label(ret.a.span);
      if (this.disabled) {
        ret.a.disabled = 'disabled';
      }
      return ret;
    };
    Packs_Core_Controls_LinkButton.prototype.coreDisable = function(disable) {
      return this.el.prop('disabled', disable);
    };
    Packs_Core_Controls_LinkButton.prototype.onLoad = function() {
      Packs_Core_Controls_LinkButton.__super__.onLoad.call(this);
      return this.el.click(__bind(function() {
        var n, v, _ref, _results;
        if (!(this.disabled || this.el.prop('disabled'))) {
          if (this.args.onClick) {
            this.args.onClick();
          }
          if (this.args.invoke) {
            _ref = this.args.invoke;
            _results = [];
            for (n in _ref) {
              v = _ref[n];
              _results.push((n !== 'html') && (n !== 'onResult') ? this.invoke(n, _.isFunction(v) ? v() : v) : void 0);
            }
            return _results;
          }
        }
      }, this));
    };
    function Packs_Core_Controls_LinkButton(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_LinkButton.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_LinkButton.prototype.className = function() {
      return "Core_Controls_LinkButton";
    };
    Packs_Core_Controls_LinkButton.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_LinkButton;
  })();
}).call(this);
