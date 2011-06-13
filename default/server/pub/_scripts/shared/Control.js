(function() {
  var smio;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Control = (function() {
    Control.prototype.coreDisable = function(disable) {};
    Control.prototype.disable = function(disable, isInherit) {
      var ctl, id, _ref, _results;
      if (!isInherit) {
        this.disabled = disable;
      } else if (!disable) {
        disable = this.disabled;
      }
      if (this.el) {
        if (disable) {
          this.el.removeClass('smio-enabled').addClass('smio-disabled');
        } else {
          this.el.removeClass('smio-disabled').addClass('smio-enabled');
        }
      }
      this.coreDisable(disable);
      _ref = this.controls;
      _results = [];
      for (id in _ref) {
        ctl = _ref[id];
        _results.push(ctl.disable(disable, isInherit));
      }
      return _results;
    };
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
      if (this.disabled) {
        this.el.removeClass('smio-enabled').addClass('smio-disabled');
      } else {
        this.el.removeClass('smio-disabled').addClass('smio-enabled');
      }
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
    Control.prototype.sub = function(id) {
      return $("#" + (this.id(id)));
    };
    Control.prototype.syncUpdate = function(ctlDesc) {};
    Control.prototype.un = function(eventName, handler) {
      if (eventName && this.eventHandlers[eventName] && _.isFunction(handler)) {
        return this.eventHandlers[eventName] = _.without(this.eventHandlers[eventName], handler);
      }
    };
    Control.util = {
      jsVoid: 'javascript:void(0);'
    };
    Control.tagRenderers = {
      "arg": function(ctl, name) {
        return ctl.args[name];
      },
      "ctl": function(ctl, className, args, emptyIfMissing) {
        var ctor, subCtl;
        if ((!ctl.controls[args.id]) && ((ctor = smio['Packs_' + ctl.baseName + '_' + className]) || (ctor = smio['Packs_' + ctl.baseName + '_Controls_' + className]) || (ctor = smio['Packs_Core_Controls_' + className]))) {
          subCtl = new ctor(ctl.client, ctl, args);
          ctl.client.allControls[subCtl.id()] = ctl.controls[args.id] = subCtl;
        }
        if (ctl.controls[args.id]) {
          return ctl.controls[args.id].renderHtml();
        } else if (ctl.ctlRenderers[className]) {
          return ctl.ctlRenderers[className](className, args);
        } else {
          if (emptyIfMissing) {
            return '';
          } else {
            return "!!CONTROL_NOT_FOUND::" + className + "!!";
          }
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
      "r": function() {
        var args, ctl, name;
        ctl = arguments[0], name = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        return ctl.res.apply(ctl, (_.toArray(arguments)).slice(1, arguments.length));
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
      this.disabled = smio.iif(this.args.disabled);
      this.isServer = !(this.isClient = this.client ? true : false);
      this.ctlID = this.args.id;
      this.controls = {};
      this.containers = {};
      this.ctlRenderers = {};
      this.eventHandlers = {};
      this.el = null;
      this.idStack = [];
      this._html = '';
    }
    Control.prototype.cls = function() {
      return smio[this.fullClassName()];
    };
    Control.prototype.ctl = function(ctlID) {
      var c;
      c = this.client.allControls(ctlID);
      if (c) {
        return c;
      } else {
        return this.client.allControls(this.id(ctlID));
      }
    };
    Control.prototype.fullClassName = function() {
      return "Packs_" + this.className;
    };
    Control.prototype.id = function(subID) {
      var myID;
      myID = this.parent ? "" + (this.parent.id()) + "_" + this.ctlID : this.ctlID;
      if (subID) {
        return myID + '_' + (this.idStack.length ? (this.idStack.join('_')) + '_' : '') + subID;
      } else {
        return myID;
      }
    };
    Control.prototype.init = function() {};
    Control.prototype.renderJsonTemplate = function(tagKey, objTree, level) {
      var an, atts, attstr, av, buf, hasc, haso, kc, kt, name, pos, result, toAtt, toHtml, val;
      buf = '';
      toHtml = smio.Util.String.htmlEncode;
      toAtt = __bind(function(an, av) {
        av = "" + av;
        return " " + an + "=\"" + (toHtml(an === 'id' ? this.id(av) : av)) + "\"";
      }, this);
      if (!level) {
        level = 0;
      }
      if ((kt = _.trim(tagKey))) {
        atts = {};
        attstr = '';
        kc = [];
        while ((pos = kt.lastIndexOf('.')) > 0) {
          kc.push(_.trim(kt.substr(pos + 1)));
          kt = _.trim(kt.substr(0, pos));
        }
        if (kc.length) {
          atts['class'] = kc.join(' ');
        }
        if ((pos = kt.lastIndexOf('#')) > 0) {
          atts.id = _.trim(kt.substr(pos + 1));
          kt = _.trim(kt.substr(0, pos));
        }
        for (an in atts) {
          av = atts[an];
          attstr += toAtt(an, av);
        }
        if (!objTree) {
          buf += "<" + kt + attstr + "/>";
        } else if (typeof objTree === 'object') {
          if ((result = smio.Control.tagRenderers.ctl(this, kt, smio.Util.Object.mergeDefaults(_.clone(objTree), atts), true))) {
            buf += result;
          } else {
            buf += "<" + kt + attstr;
            hasc = false;
            haso = false;
            for (name in objTree) {
              val = objTree[name];
              if (val != null) {
                if ((_.isArray(val)) || (typeof val === 'object')) {
                  haso = true;
                } else {
                  buf += toAtt(name, val);
                }
              }
            }
            if (haso) {
              for (name in objTree) {
                val = objTree[name];
                if (val) {
                  if (_.isArray(val)) {
                    if (!hasc) {
                      hasc = true;
                      buf += ">";
                    }
                    buf += (name === '_' ? toHtml(val.join('')) : name === 'html' ? val.join('') : this.renderJsonTemplate(name, toHtml(val.join('')), level + 1));
                  } else if (typeof val === 'object') {
                    if (!hasc) {
                      hasc = true;
                      buf += ">";
                    }
                    buf += this.renderJsonTemplate(name, val, level + 1);
                  }
                }
              }
            }
            buf += (hasc ? "</" + kt + ">" : "/>");
          }
        } else {
          buf += "<" + kt + attstr + ">" + (_.isArray(objTree) ? (kt === 'html' ? objTree.join('') : toHtml(objTree.join(''))) : objTree) + "</" + kt + ">";
        }
      }
      return buf;
    };
    Control.prototype.renderHtml = function($el) {
      var objTree, subTree, tagKey;
      if ((!this._html) && this['renderTemplate'] && (_.isFunction(this.renderTemplate)) && (objTree = this.renderTemplate())) {
        this._html = '';
        for (tagKey in objTree) {
          subTree = objTree[tagKey];
          this._html += this.renderJsonTemplate(tagKey, subTree);
        }
      }
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
        return "!!UNKNOWN_TAG::" + name + "!!";
      }
    };
    Control.prototype.r = function() {
      var args, name;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.res.apply(this, _.toArray(arguments));
    };
    Control.prototype.res = function() {
      var args, i, name, parts, resSet, resSets, ret, _ref;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      ret = '';
      if ((resSets = (this.isClient ? smio.resources : smio.inst.resourceSets))) {
        parts = this.baseName.split('_');
        for (i = _ref = parts.length - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
          if ((resSet = resSets[parts.slice(0, (i + 1) || 9e9).join('_')]) && (ret = (this.isClient ? resSet[name] : resSet['en'][name]))) {
            break;
          }
        }
        if (!ret) {
          ret = this.isClient ? resSets.smoothio[name] : resSets.smoothio['en'][name];
        }
      }
      if (ret) {
        if (args.length) {
          return _.sprintf.apply(_, [ret].concat(__slice.call(args)));
        } else {
          return ret;
        }
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
