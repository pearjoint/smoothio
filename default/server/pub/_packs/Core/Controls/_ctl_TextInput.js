(function() {
  /*
  Auto-generated from Core/Controls/TextInput.ctl
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
  smio.Packs_Core_Controls_TextInput = (function() {
    __extends(Packs_Core_Controls_TextInput, smio.Control);
    Packs_Core_Controls_TextInput.prototype.renderTemplate = function() {
      var ret;
      ret = {
        span: {
          "class": 'smio-textinput',
          id: ''
        }
      };
      if (this.args.labelText || this.args.labelHtml) {
        ret.span.label = {
          id: 'label',
          "for": this.id('input')
        };
        this.jsonTemplates_Label(ret.span.label);
      }
      ret.span.input = {
        id: 'input',
        "class": 'smio-textinput',
        type: this.args.type === 'password' ? 'password' : 'text'
      };
      if (this.disabled) {
        ret.span.input.readonly = 'readonly';
      }
      if (this.args.autoFocus) {
        ret.span.input.autofocus = 'autofocus';
      }
      if (this.args.required) {
        ret.span.input.required = 'required';
      }
      if (this.args.placeholder) {
        ret.span.input.placeholder = this.r(this.args.placeholder);
      }
      if (this.args.value) {
        ret.span.input.value = this.args.value;
      }
      if (this.args.nospellcheck) {
        ret.span.input.spellcheck = false;
      }
      return ret;
    };
    Packs_Core_Controls_TextInput.prototype.coreDisable = function(disable) {
      return this.sub('input').prop('readonly', disable);
    };
    Packs_Core_Controls_TextInput.prototype.onLoad = function() {
      if (this.args.onChange) {
        return this.sub('input').change(__bind(function() {
          return this.args.onChange(this.sub('input'));
        }, this));
      }
    };
    function Packs_Core_Controls_TextInput(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_TextInput.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_TextInput.prototype.className = function() {
      return "Core_Controls_TextInput";
    };
    Packs_Core_Controls_TextInput.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_TextInput;
  })();
}).call(this);
