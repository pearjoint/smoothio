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
  };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_Toggle = (function() {
    __extends(Packs_Core_Controls_Toggle, smio.Control);
    Packs_Core_Controls_Toggle.prototype.renderTemplate = function() {
      return {
        span: {
          id: '',
          input: {
            id: 'input'
          },
          label: {
            id: 'label',
            "for": this.id('input'),
            text: [this.args.label || '']
          }
        }
      };
    };
    function Packs_Core_Controls_Toggle(client, parent, args) {
      Packs_Core_Controls_Toggle.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_Toggle");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_Controls_Toggle;
  })();
}).call(this);
