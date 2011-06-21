(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __slice = Array.prototype.slice;
  smio = global.smoothio;
  smio.Control = (function() {
    Control.prototype.coreDisable = function(disable) {};
    Control.prototype.disable = function(disable, isInherit) {
      var ctl, len, _i, _len, _ref;
      if (!arguments.length) {
        disable = isInherit = true;
      }
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
      len = 0;
      _ref = this.controls;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ctl = _ref[_i];
        len++;
        ctl.disable(disable, isInherit);
      }
      if (this.el && (len === 0)) {
        return this.el[disable ? 'addClass' : 'removeClass']('smio-disabledfaded');
      }
    };
    Control.prototype.enable = function() {
      return this.disable(false, true);
    };
    Control.prototype.invoke = function(cmd, args, now) {
      var msg;
      this.disable(true);
      this.el.addClass('smio-invoking');
      this.onInvoking(cmd);
      msg = this.client.socket.message(args, {
        cmd: [cmd],
        cid: [this.id()]
      });
      alert(JSON.stringify(msg));
      return this.client.socket.send(msg);
    };
    Control.prototype.labelHtml = function(html) {
      if (!this.el) {
        return '';
      } else {
        if (html) {
          this.el.html(html);
        }
        return this.el.html();
      }
    };
    Control.prototype.on = function(eventName, handler) {
      var eh, ehs, _i, _len, _ref, _results;
      if (eventName) {
        ehs = this['eventHandlers'];
        if (_.isFunction(handler)) {
          if (!ehs) {
            ehs = this['eventHandlers'] = {};
          }
          if (!ehs[eventName]) {
            ehs[eventName] = [];
          }
          if (!(__indexOf.call(ehs[eventName], handler) >= 0)) {
            return ehs[eventName].push(handler);
          }
        } else if (ehs && ehs[eventName]) {
          _ref = ehs[eventName];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            eh = _ref[_i];
            _results.push(eh.apply(this, handler));
          }
          return _results;
        }
      }
    };
    Control.prototype.onInvoking = function(msg) {
      var lh;
      if ((lh = this.labelHtml())) {
        this.lh = lh;
        return this.labelHtml(this.r('invoking'));
      }
    };
    Control.prototype.onInvokeResult = function() {
      if (this['lh'] != null) {
        this.labelHtml(this.lh);
        return delete this['lh'];
      }
    };
    Control.prototype.onLoad = function() {
      var ctl, _i, _len, _ref, _results;
      this.el = $('#' + this.id());
      if (this.disabled) {
        this.el.removeClass('smio-enabled').addClass('smio-disabled');
        if (!this.controls.length) {
          this.el.addClass('smio-disabledfaded');
        }
      } else {
        this.el.removeClass('smio-disabled').addClass('smio-enabled');
      }
      _ref = this.controls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ctl = _ref[_i];
        _results.push(ctl.onLoad());
      }
      return _results;
    };
    Control.prototype.onWindowResize = function(width, height) {};
    Control.prototype.sub = function(id) {
      var ctl, i, parts, _ref;
      ctl = this;
      if ((parts = id.split('/')).length > 1) {
        for (i = 0, _ref = parts.length - 1; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          ctl = ctl.ctl(parts[i]);
        }
      }
      return $("#" + (ctl.id(parts[parts.length - 1])));
    };
    Control.prototype.syncUpdate = function(ctlDesc) {};
    Control.prototype.un = function(eventName, handler) {
      var ehs;
      if (eventName && (ehs = this['eventHandlers']) && ehs[eventName] && _.isFunction(handler)) {
        return ehs[eventName] = _.without(ehs[eventName], handler);
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
        var ctor, renderFunc, subCtl;
        subCtl = _.detect(ctl.controls, function(sc) {
          return sc.ctlID === args.id;
        });
        if ((!subCtl) && ((ctor = smio["Packs_" + (ctl.classNamespace()) + "_" + className]) || (ctor = smio["Packs_" + (ctl.classNamespace()) + "_Controls_" + className]) || (ctor = smio["Packs_Core_Controls_" + className]))) {
          ctl.controls.push(subCtl = new ctor(ctl.client, ctl, args));
          ctl.client.allControls[subCtl.id()] = subCtl;
        }
        if (subCtl) {
          return subCtl.renderHtml();
        } else if ((renderFunc = ctl["renderHtml_" + className])) {
          return renderFunc(className, args);
        } else {
          if (emptyIfMissing) {
            return '';
          } else {
            return "!!CONTROL_NOT_FOUND::" + className + "!!";
          }
        }
      },
      "inner": function(ctl, name, args) {
        var a, ao, o, _i, _len, _ref;
        o = [];
        a = args ? args : ctl.args;
        if (a['__o'] && a.__o['length']) {
          _ref = a.__o;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ao = _ref[_i];
            if (_.isString(ao)) {
              o.push(ao);
            } else {
              o.push(ctl.renderTag(ao.t, ao.s, ao.a));
            }
          }
        }
        return o.join('');
      },
      "r": function() {
        var args, ctl, name;
        ctl = arguments[0], name = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        return ctl.res.apply(ctl, [name].concat(__slice.call(args)));
      },
      "tojs": function(ctl, name, args) {
        var pn, pv;
        for (pn in args) {
          pv = args[pn];
          name = name.replace(pn, pv);
        }
        return CoffeeScript.compile(name).split('\n').join('');
      }
    };
    function Control(client, parent, args) {
      this.client = client;
      this.parent = parent;
      this.args = args;
      this.res = __bind(this.res, this);
      this.r = __bind(this.r, this);
      this.renderTag = __bind(this.renderTag, this);
      this.renderHtml = __bind(this.renderHtml, this);
      this.renderJsonTemplate = __bind(this.renderJsonTemplate, this);
      this.jsSelf = __bind(this.jsSelf, this);
      this.jsonTemplates_Label = __bind(this.jsonTemplates_Label, this);
      this.jsonTemplates_HasLabel = __bind(this.jsonTemplates_HasLabel, this);
      this.init = __bind(this.init, this);
      this.id = __bind(this.id, this);
      this.ctl = __bind(this.ctl, this);
      this.cssClass = __bind(this.cssClass, this);
      this.cssBaseClass = __bind(this.cssBaseClass, this);
      this.cls = __bind(this.cls, this);
      this.classPath = __bind(this.classPath, this);
      this.un = __bind(this.un, this);
      this.syncUpdate = __bind(this.syncUpdate, this);
      this.sub = __bind(this.sub, this);
      this.onWindowResize = __bind(this.onWindowResize, this);
      this.onLoad = __bind(this.onLoad, this);
      this.onInvokeResult = __bind(this.onInvokeResult, this);
      this.onInvoking = __bind(this.onInvoking, this);
      this.on = __bind(this.on, this);
      this.labelHtml = __bind(this.labelHtml, this);
      this.invoke = __bind(this.invoke, this);
      this.enable = __bind(this.enable, this);
      this.disable = __bind(this.disable, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.disabled = smio.iif(this.args.disabled);
      this.ctlID = this.args.id;
      this.controls = [];
      this.el = null;
    }
    Control.prototype.classPath = function() {
      return "Packs_" + (this.className());
    };
    Control.prototype.cls = function() {
      return smio[this.classPath()];
    };
    Control.prototype.cssBaseClass = function() {
      return '';
    };
    Control.prototype.cssClass = function() {
      var a, bc, sub, _i, _len;
      a = ['smio'];
      if ((bc = this.cssBaseClass())) {
        a.push(bc);
      }
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        sub = arguments[_i];
        if (sub) {
          a.push(sub);
        }
      }
      return a.join('-');
    };
    Control.prototype.ctl = function(ctlID) {
      var c, cid, cids, ctl, _i, _len, _ref;
      _ref = [this, ctlID.split('/')], ctl = _ref[0], cids = _ref[1];
      if ((c = this.client.allControls[ctlID])) {
        ctl = c;
      } else {
        for (_i = 0, _len = cids.length; _i < _len; _i++) {
          cid = cids[_i];
          if ((c = this.client.allControls[ctl.id(cid)])) {
            ctl = c;
          } else {
            break;
          }
        }
      }
      return ctl;
    };
    Control.prototype.id = function(subID) {
      return (this.parent ? "" + (this.parent.id()) + "_" + this.ctlID : this.ctlID) + (subID ? '_' + subID : '');
    };
    Control.prototype.init = function() {};
    Control.prototype.jsonTemplates_HasLabel = function(target) {
      return this.args.labelText || this.args.labelHtml || this.args.labelRawText || this.args.labelRawHtml;
    };
    Control.prototype.jsonTemplates_Label = function(target) {
      var label, rawLabel;
      rawLabel = this.args.labelRawHtml ? this.args.labelRawHtml : this.args.labelRawText;
      label = this.args.labelHtml ? this.args.labelHtml : this.args.labelText;
      if (rawLabel) {
        return target[this.args.labelRawHtml ? 'html' : '_'] = [rawLabel];
      } else if (label) {
        return target[this.args.labelHtml ? 'html' : '_'] = [this.r(label)];
      }
    };
    Control.prototype.jsSelf = function() {
      return "smio.client.allControls['" + this.id() + "']";
    };
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
                if (_.isArray(val) || (typeof val === 'object')) {
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
      var objTree, subTree, tagKey, _html;
      _html = '';
      if (this['renderTemplate'] && _.isFunction(this.renderTemplate) && (objTree = this.renderTemplate())) {
        for (tagKey in objTree) {
          subTree = objTree[tagKey];
          _html += this.renderJsonTemplate(tagKey, subTree);
        }
      }
      if ($el) {
        $el.html(_html);
      }
      return _html;
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
      return this.res.apply(this, [name].concat(__slice.call(args)));
    };
    Control.prototype.res = function() {
      var args, i, name, parts, resSet, resSets, ret, _ref, _ref2;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      ret = '';
      if (((!args) || (!args.length)) && _.isArray(name) && (name.length > 1)) {
        args = name.slice(1);
        name = name[0];
      }
      if ((resSets = (this.client ? smio.resources : smio.inst.resourceSets))) {
        parts = this.classNamespace().split('_');
        for (i = _ref = parts.length - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
          if ((resSet = resSets[parts.slice(0, (i + 1) || 9e9).join('_')]) && (ret = (this.client ? resSet[name] : resSet['en'][name]))) {
            break;
          }
        }
        if (!ret) {
          ret = this.client ? resSets.smoothio[name] : resSets.smoothio['en'][name];
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
          return (_ref2 = this.parent).res.apply(_ref2, [name].concat(__slice.call(args)));
        } else {
          return "!!RES::" + name + "!!";
        }
      }
    };
    return Control;
  })();
}).call(this);
