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
        if ((!ctl.controls[args.id]) && ((ctor = smio['Packs_' + ctl.baseName + '_' + className]) || (ctor = smio['Packs_' + ctl.baseName + '_Controls_' + className]) || (ctor = smio['Packs_Core_Controls_' + className]))) {
          ctl.client.allControls[args.id] = ctl.controls[args.id] = new ctor(this.client, ctl, args);
        }
        if (ctl.controls[args.id]) {
          return ctl.controls[args.id].renderHtml();
        } else if (ctl.ctlRenderers[className]) {
          return ctl.ctlRenderers[className](className, args);
        } else {
          return "!!CONTROL_NOT_FOUND::" + className + "!!";
        }
      },
      "inner": function(ctl, name, args) {
        var a, i, o, tmp, _ref;
        o = [];
        a = args ? args : ctl.args;
        if (a['__o'] && a.__o['length']) {
          for (i = 0, _ref = a.__o.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
            if (_.isString((tmp = a.__o[i]))) {
              o.push(tmp);
            } else {
              o.push(ctl.renderTag(tmp.t, tmp.s, tmp.a));
            }
          }
        }
        return o.join('');
      },
      "r": function(ctl, name) {
        return ctl.res.apply(ctl, [name]);
      },
      "tojs": function(ctl, name, args) {
        var pn, pv;
        for (pn in args) {
          pv = args[pn];
          name = name.replace(pn, pv);
        }
        return ((CoffeeScript.compile(name)).split('\n')).join('');
      }
    };
    function Control(client, parent, args, baseName, className) {
      this.client = client;
      this.parent = parent;
      this.args = args;
      this.baseName = baseName;
      this.className = className;
      this.ctlID = this.args.id;
      this.controls = {};
      this.containers = {};
      this.ctlRenderers = {};
      this.eventHandlers = {};
      this.el = null;
      this._html = '';
    }
    Control.prototype.ctl = function(ctlID) {
      var c;
      c = this.client.allControls(ctlID);
      if (c) {
        return c;
      } else {
        return this.client.allControls(this.id(ctlID));
      }
    };
    Control.prototype.id = function(subID) {
      var myID;
      myID = this.parent ? "" + (this.parent.id()) + "_" + this.ctlID : this.ctlID;
      if (subID) {
        return myID + '_' + subID;
      } else {
        return myID;
      }
    };
    Control.prototype.init = function() {};
    Control.prototype.on = function(eventName, handler) {
      var eh, _i, _len, _ref, _results;
      if (eventName) {
        if (_.isFunction(handler)) {
          if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
          }
          if (0 > _.indexOf(this.eventHandlers[eventName], handler)) {
            return this.eventHandlers[eventName].push(handler);
          }
        } else if (this.eventHandlers[eventName]) {
          _ref = this.eventHandlers[eventName];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            eh = _ref[_i];
            _results.push(eh.apply(this, handler));
          }
          return _results;
        }
      }
    };
    Control.prototype.onLoad = function() {
      var ctl, id, prefix, _ref;
      prefix = "cscript:";
      this.el = $('#' + this.id());
      _ref = this.controls;
      for (id in _ref) {
        ctl = _ref[id];
        ctl.onLoad();
      }
      if (!this.parent) {
        return $("a[href^='" + prefix + "']").each(function(i, a) {
          try {
            return a.href = 'javascript:' + ((CoffeeScript.compile(a.href.substr(prefix.length))).split('\n')).join('');
          } catch (err) {
            alert("CODE:" + ((unescape(a.href)).substr(prefix.length)) + ":CODE");
            return a.href = "javascript:smio.client.socket.onError(\"" + err + "\");";
          }
        });
      }
    };
    Control.prototype.onWindowResize = function(width, height) {};
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
    Control.prototype.un = function(eventName, handler) {
      if (eventName && this.eventHandlers[eventName] && _.isFunction(handler)) {
        return this.eventHandlers[eventName] = _.without(this.eventHandlers[eventName], handler);
      }
    };
    Control.prototype.res = function(name) {
      var i, parts, resSet, resSets, ret, _ref;
      ret = '';
      if ((resSets = smio.resources)) {
        parts = this.baseName.split('_');
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
        if (this.parent) {
          return this.parent.res(name);
        } else {
          return "!!RES::" + name + "!!";
        }
      }
    };
    return Control;
  })();
}).call(this);
