(function() {
  /*
  Auto-generated from Core/Controls/TextInput.ctl
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
  smio.Packs_Core_Controls_TextInput = (function() {
    __extends(Packs_Core_Controls_TextInput, smio.Control);
    Packs_Core_Controls_TextInput.prototype.renderTemplate = function() {
      var ret;
      ret = {
        span: {
          id: '',
          input: {
            type: 'text'
          }
        }
      };
      return ret;
    };
    function Packs_Core_Controls_TextInput(client, parent, args) {
      Packs_Core_Controls_TextInput.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_TextInput");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_Controls_TextInput;
  })();
}).call(this);
