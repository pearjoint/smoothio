(function() {
  var smio;
  smio = global.smoothio;
  smio.Control = (function() {
    Control.tagRenderers = {
      "arg": function(ctl, name) {
        return ctl.args[name];
      },
      "ctl": function(ctl, className, args) {
        var ctor;
        if ((!ctl.controls[args.id]) && (ctor = smio['Packs_' + ctl.baseName + '_' + className])) {
          ctl.controls[args.id] = new ctor(args);
        }
        if (ctl.controls[args.id]) {
          return ctl.controls[args.id].renderHtml();
        } else {
          return "CONTROL_NOT_FOUND:" + className;
        }
      }
    };
    function Control(args, baseName, className) {
      this.args = args;
      this.ctlID = args.id;
      this.baseName = baseName;
      this.className = className;
      this.controls = {};
      this.el = null;
      this._html = '';
    }
    Control.prototype.id = function(subID) {
      if (subID) {
        return this.ctlID + '_' + subID;
      } else {
        return this.ctlID;
      }
    };
    Control.prototype.init = function() {};
    Control.prototype.onLoad = function($root) {
      var ctl, id, _ref, _results;
      this.el = $('#' + this.ctlID);
      _ref = this.controls;
      _results = [];
      for (id in _ref) {
        ctl = _ref[id];
        _results.push(ctl.onLoad($root));
      }
      return _results;
    };
    Control.prototype.renderHtml = function($el) {
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    Control.prototype.renderTag = function(name, sarg, jarg) {
      var renderer;
      renderer = smio.Control.tagRenderers[name];
      if (renderer) {
        return renderer(this, sarg, jarg);
      } else {
        return "UNKNOWN_TAG:" + name;
      }
    };
    return Control;
  })();
}).call(this);
