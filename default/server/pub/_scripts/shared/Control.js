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
          ctl.client.allControls[args.id] = ctl.controls[args.id] = new ctor(this.client, args);
        }
        if (ctl.controls[args.id]) {
          return ctl.controls[args.id].renderHtml();
        } else {
          return "!!CONTROL_NOT_FOUND::" + className + "!!";
        }
      },
      "r": function(ctl, name) {
        var i, parts, resSet, resSets, ret, _ref;
        ret = '';
        if ((resSets = smio.resources)) {
          parts = ctl.baseName.split('_');
          for (i = _ref = parts.length - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
            if ((resSet = resSets[parts.slice(0, (i + 1) || 9e9).join('_')]) && (ret = resSet[name])) {
              break;
            }
          }
          if (!ret) {
            ret = smio.resources.smoothio[name];
          }
        }
        if (ret) {
          return ret;
        } else {
          return name;
        }
      }
    };
    function Control(client, args, baseName, className) {
      this.client = client;
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
    Control.prototype.onLoad = function() {
      var ctl, id, _ref, _results;
      this.el = $('#' + this.ctlID);
      _ref = this.controls;
      _results = [];
      for (id in _ref) {
        ctl = _ref[id];
        _results.push(ctl.onLoad());
      }
      return _results;
    };
    Control.prototype.renderTag = function(name, sarg, jarg) {
      var renderer;
      renderer = smio.Control.tagRenderers[name];
      if (renderer) {
        return renderer(this, sarg, jarg);
      } else {
        return "!!UNKNOWN_TAG::" + name + "!!";
      }
    };
    Control.prototype.syncUpdate = function(ctlDesc) {};
    return Control;
  })();
}).call(this);
