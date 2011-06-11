(function() {
  /*
  Auto-generated from Core/Controls/Toggle.ctl
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
  smio.Packs_Core_Controls_Toggle = (function() {
    __extends(Packs_Core_Controls_Toggle, smio.Control);
    Packs_Core_Controls_Toggle.prototype.renderTemplate = function() {
      var ischk, ret;
      ischk = this.isCheckBox();
      ret = {
        span: {
          "class": "smio-toggleinput smio-toggleinput-" + (smio.iif(ischk, 'checkbox', 'radio')) + " smio-toggleinput-" + (smio.iif(this.args.checked, '', 'un')) + "checked smio-toggleinput-" + (this.getSharedClass()),
          id: '',
          span: {
            "class": "smio-toggleinput-btnlabel",
            span: {
              id: 'btn',
              "class": 'smio-toggleinput-btn',
              span: {
                id: 'btnglyph',
                "class": 'smio-toggleinput-btnbtn',
                span: {
                  id: 'glyph',
                  "class": 'smio-toggleinput-btnglyph'
                }
              }
            }
          }
        }
      };
      ret.span.span.span.input = {
        id: 'input',
        name: this.args.toggleName,
        "class": 'smio-toggleinput',
        type: smio.iif(ischk, 'checkbox', 'radio')
      };
      if (this.args.checked) {
        ret.span.span.span.input.checked = 'checked';
        ret.span.span.span.span.span.html = ['&#x2714;'];
      }
      if (this.args.labelText || this.args.labelHtml) {
        ret.span.span.label = {
          id: 'label',
          "class": 'smio-toggleinput',
          "for": this.id('input')
        };
        ret.span.span.label[smio.iif(this.args.labelHtml, 'html', 'text')] = [smio.iif(this.args.labelHtml, this.args.labelHtml, this.args.labelText)];
      }
      return ret;
    };
    Packs_Core_Controls_Toggle.prototype.getSharedClass = function() {
      return "" + (this.parent.id()) + "_" + (this.args.toggleName || '');
    };
    Packs_Core_Controls_Toggle.prototype.isCheckBox = function() {
      return this.args.type === 'checkbox';
    };
    Packs_Core_Controls_Toggle.prototype.isRadioBox = function() {
      return this.args.type !== 'checkbox';
    };
    Packs_Core_Controls_Toggle.prototype.onBlur = function() {};
    Packs_Core_Controls_Toggle.prototype.onCheck = function(passive) {
      var nuCls, unCls;
      if (this.val !== this.elInput.prop('checked')) {
        this.val = this.elInput.prop('checked');
        nuCls = smio.iif(this.val, 'smio-toggleinput-checked', 'smio-toggleinput-unchecked');
        unCls = smio.iif(this.val, 'smio-toggleinput-unchecked', 'smio-toggleinput-checked');
        this.el.removeClass(unCls).addClass(nuCls);
        $("#" + (this.id('glyph'))).html(smio.iif(this.val, '&#x2714;', ''));
        if (!passive) {
          return $(".smio-toggleinput-" + (this.getSharedClass()) + " input.smio-toggleinput").each(__bind(function(i, e) {
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
    Packs_Core_Controls_Toggle.prototype.onFocus = function() {};
    Packs_Core_Controls_Toggle.prototype.onLoad = function() {
      Packs_Core_Controls_Toggle.__super__.onLoad.call(this);
      (this.elInput = $("#" + (this.id('input')))).click(__bind(function() {
        return this.onCheck();
      }, this));
      $("#" + (this.id('btn'))).click(__bind(function() {
        this.elInput.prop('checked', true);
        return this.onCheck();
      }, this));
      return this.val = this.elInput.prop('checked');
    };
    function Packs_Core_Controls_Toggle(client, parent, args) {
      Packs_Core_Controls_Toggle.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_Toggle");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_Controls_Toggle;
  })();
}).call(this);
