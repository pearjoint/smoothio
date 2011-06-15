(function() {
  /*
  Auto-generated from Core/Controls/Toggle.ctl
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
  smio.Packs_Core_Controls_Toggle = (function() {
    __extends(Packs_Core_Controls_Toggle, smio.Control);
    Packs_Core_Controls_Toggle.checkmark = '&#x2714;';
    Packs_Core_Controls_Toggle.radiomark = '';
    Packs_Core_Controls_Toggle.prototype.renderTemplate = function() {
      var getGSpan, ischk, ret;
      ischk = this.isCheckBox();
      ret = {
        span: {
          "class": "= smio-toggleinput = smio-toggleinput-" + (ischk ? 'checkbox' : 'radio') + " = smio-toggleinput-" + (this.args.checked ? '' : 'un') + "checked = smio-toggleinput-" + (this.commonCssClass()),
          id: '',
          span: {
            id: 'btnlabel',
            "class": "= smio-toggleinput-btnlabel",
            span: {
              id: 'btn',
              "class": '= smio-toggleinput-btn',
              span: {
                id: 'btnglyph',
                "class": '= smio-toggleinput-btnbtn'
              }
            }
          }
        }
      };
      getGSpan = function() {
        if (ischk) {
          return ret.span.span.span;
        } else {
          return ret.span.span.span.span;
        }
      };
      getGSpan()['span #glyph'] = {
        "class": '= smio-toggleinput-btnglyph'
      };
      ret.span.span.span.input = {
        id: 'input',
        name: this.args.toggleName,
        "class": '= smio-toggleinput',
        type: ischk ? 'checkbox' : 'radio'
      };
      if (this.disabled) {
        ret.span.span.span.input.disabled = 'disabled';
      }
      if (this.args.checked) {
        ret.span.span.span.input.checked = 'checked';
        getGSpan()['span #glyph'].html = [smio[this.classPath()][ischk ? 'checkmark' : 'radiomark']];
      }
      if (this.args.labelText || this.args.labelHtml) {
        ret.span.span.label = {
          id: 'label',
          "class": '= smio-toggleinput',
          "for": this.id('input')
        };
        this.jsonTemplates_Label(ret.span.span.label);
      }
      return ret;
    };
    Packs_Core_Controls_Toggle.prototype.commonCssClass = function() {
      return this.args.toggleName || this.id();
    };
    Packs_Core_Controls_Toggle.prototype.coreDisable = function(disable) {
      return this.sub('input').prop('disabled', disable);
    };
    Packs_Core_Controls_Toggle.prototype.isCheckBox = function() {
      return this.args.type === 'checkbox';
    };
    Packs_Core_Controls_Toggle.prototype.isRadioBox = function() {
      return this.args.type !== 'checkbox';
    };
    Packs_Core_Controls_Toggle.prototype.onCheck = function(passive) {
      var cc, el, nuCls, unCls, _ref;
      _ref = ['= smio-toggleinput', this.sub('input')], cc = _ref[0], el = _ref[1];
      if (this.chk !== el.prop('checked')) {
        this.chk = el.prop('checked');
        nuCls = cc + (this.chk ? '-checked' : '-unchecked');
        unCls = cc + (this.chk ? '-unchecked' : '-checked');
        this.el.removeClass(unCls).addClass(nuCls);
        this.sub('glyph').html(!this.chk ? '' : smio[this.classPath()][this.isCheckBox() ? 'checkmark' : 'radiomark']);
        if (this.isRadioBox() && !passive) {
          return $(".= smio-toggleinput-" + (this.commonCssClass()) + " input.= smio-toggleinput").each(__bind(function(i, e) {
            var ctl;
            if (e.id !== this.id('input')) {
              $(e).prop('checked', false);
              if ((ctl = this.client.allControls[e.id.substr(0, e.id.lastIndexOf('_'))])) {
                return ctl.onCheck(true);
              }
            }
          }, this));
        }
      }
    };
    Packs_Core_Controls_Toggle.prototype.onLoad = function() {
      var inp;
      Packs_Core_Controls_Toggle.__super__.onLoad.call(this);
      (inp = this.sub('input')).click(__bind(function(evt) {
        this.onCheck();
        if (this.isCheckBox()) {
          return evt.stopPropagation();
        }
      }, this));
      inp.blur(__bind(function() {
        return this.sub('btnlabel').removeClass('= smio-toggleinput-focused');
      }, this));
      inp.focus(__bind(function() {
        return this.sub('btnlabel').addClass('= smio-toggleinput-focused');
      }, this));
      this.sub('btn').click(__bind(function() {
        var el;
        el = this.sub('input');
        if (!el.prop('disabled')) {
          el.prop('checked', this.isRadioBox() || !el.prop('checked'));
          return this.onCheck();
        }
      }, this));
      return this.chk = inp.prop('checked');
    };
    function Packs_Core_Controls_Toggle(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.onCheck = __bind(this.onCheck, this);
      this.isRadioBox = __bind(this.isRadioBox, this);
      this.isCheckBox = __bind(this.isCheckBox, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.commonCssClass = __bind(this.commonCssClass, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_Toggle.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_Toggle.prototype.className = function() {
      return "Core_Controls_Toggle";
    };
    Packs_Core_Controls_Toggle.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_Toggle;
  })();
}).call(this);
