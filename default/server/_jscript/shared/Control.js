(function() {
  var coffee, node_util, smio, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  _ = require('underscore');
  _.mixin(require('underscore.string'));
  coffee = require('coffee-script');
  node_util = require('util');
  smio = global.smoothio;
  smio.Control = (function() {
    Control.compile = function(inst, ctlContent, controlPath) {
      var baseName, br, c, className, coffeeScript, contentParts, decls, dyn, dynCmd, inDyn, ind, indent, isCmd, jarg, l, lastChar, lastContent, lind, lines, obj, oneUp, part, pathParts, pos, posC, posS, renderParts, rind, rp, sarg, staToc, stimes, subs, tmpPos, tmpPos2, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _len6, _m, _n, _ref, _ref2, _ref3;
      this.inst = inst;
      _ref = [false, '../', [], '', [], '', '', {}, '@@'], inDyn = _ref[0], oneUp = _ref[1], contentParts = _ref[2], decls = _ref[3], renderParts = _ref[4], lastChar = _ref[5], lastContent = _ref[6], obj = _ref[7], staToc = _ref[8];
      pathParts = controlPath.substr(0, controlPath.lastIndexOf('.')).split('/');
      baseName = pathParts.slice(0, pathParts.length - 1).join('_');
      className = pathParts.join('_');
      if (ctlContent && ctlContent[0] !== '<') {
        ctlContent = '<%script:\n' + ((function() {
          var _i, _len, _ref2, _results;
          _ref2 = ctlContent.split('\n');
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            l = _ref2[_i];
            _results.push(smio.iif(l[0] === '#', '', '\t') + l);
          }
          return _results;
        })()).join('\n') + '\n%>';
      }
      while ((pos = ctlContent.indexOf(staToc)) >= 0) {
        ctlContent = ctlContent.substr(0, pos) + "smio[@classPath()]" + ctlContent.substr(pos + staToc.length);
      }
      for (_i = 0, _len = ctlContent.length; _i < _len; _i++) {
        c = ctlContent[_i];
        if (((lastChar + c) === '<%') && !inDyn) {
          inDyn = true;
          if (lastContent) {
            contentParts.push({
              "s": lastContent.substr(0, lastContent.length - 1)
            });
            lastContent = '';
          }
        } else if (((lastChar + c) === '%>') && inDyn) {
          inDyn = false;
          if (lastContent) {
            contentParts.push({
              "d": lastContent.substr(0, lastContent.length - 1)
            });
            lastContent = '';
          }
        } else {
          lastContent += c;
        }
        lastChar = c;
      }
      if (lastContent) {
        obj[inDyn ? 'd' : 's'] = lastContent;
        contentParts.push(obj);
      }
      for (_j = 0, _len2 = contentParts.length; _j < _len2; _j++) {
        part = contentParts[_j];
        if (part['s']) {
          renderParts.push(part['s']);
        } else if (dyn = part['d']) {
          _ref2 = ['', dyn.indexOf(':'), [dyn.indexOf(' '), dyn.indexOf('\t'), dyn.indexOf('\r'), dyn.indexOf('\n')]], dynCmd = _ref2[0], posC = _ref2[1], posS = _ref2[2];
          isCmd = (posC >= 0) && (_.any((function() {
            var _k, _len3, _results;
            _results = [];
            for (_k = 0, _len3 = posS.length; _k < _len3; _k++) {
              tmpPos = posS[_k];
              _results.push((tmpPos >= 0) && (tmpPos > posC));
            }
            return _results;
          })()) || _.all((function() {
            var _k, _len3, _results;
            _results = [];
            for (_k = 0, _len3 = posS.length; _k < _len3; _k++) {
              tmpPos2 = posS[_k];
              _results.push(tmpPos2 < 0);
            }
            return _results;
          })(), _.identity));
          if (isCmd) {
            dynCmd = dyn.substr(0, posC);
            dyn = dyn.substr(posC + 1);
          } else if (dyn[0] === '=') {
            dynCmd = '=';
            dyn = dyn.substr(1);
          } else {
            dynCmd = '_';
          }
          if (dynCmd === 'script') {
            decls += "\n" + dyn + "\n";
          } else {
            renderParts.push([dynCmd, dyn]);
          }
        }
      }
      coffeeScript = "###\nAuto-generated from " + controlPath + "\n###\n" + "#if server" + "\nrequire '" + (smio.Util.String.times(oneUp, pathParts.length)) + "_jscript/shared/Control'\n" + "#endif" + "\nsmio = smoothio = global.smoothio\nclass smio.Packs_" + className + " extends smio.Control\n" + decls + "\n	constructor: (client, parent, args) ->\n		super client, parent, args\n		@init()\n\n	className: ->\n		" + (JSON.stringify(className)) + "\n\n	classNamespace: ->\n		" + (JSON.stringify(baseName));
      if (renderParts && renderParts.length) {
        _ref3 = [-1, 3, 2, smio.Util.String.times], ind = _ref3[0], indent = _ref3[1], rind = _ref3[2], stimes = _ref3[3];
        subs = 0;
        coffeeScript += "\n\trenderHtml: ($el) =>\n\t\t__r = ctls: [], m: []\n\t\t__r.p = ((r) -> (v) -> r.o.push v) __r\n\t\t__r.o = __r.m\n";
        for (_k = 0, _len3 = renderParts.length; _k < _len3; _k++) {
          rp = renderParts[_k];
          br = "\n" + (stimes('\t', rind));
          if (_.isString(rp)) {
            coffeeScript += "" + br + "__r.p " + (JSON.stringify(rp));
          } else if (_.isArray(rp) && rp.length && rp.length > 1) {
            if (rp[0] === '=') {
              coffeeScript += "" + br + "__r.p " + rp[1];
            } else if (rp[0] === '_') {
              lines = rp[1].split('\n');
              rp[1] = '';
              if (lines && lines.length) {
                for (_l = 0, _len4 = lines.length; _l < _len4; _l++) {
                  l = lines[_l];
                  if (l && l.length && _.trim(l)) {
                    if (ind < 0) {
                      ind = 0;
                      for (_m = 0, _len5 = l.length; _m < _len5; _m++) {
                        c = l[_m];
                        if (c === '\t') {
                          ind++;
                        } else {
                          break;
                        }
                      }
                    }
                    rind = indent + ind;
                    rp[1] += "\n" + (stimes('\t', indent)) + (l.substr(ind));
                  }
                }
                if (lines.length > 1) {
                  l = _.last(lines);
                  lind = 0;
                  for (_n = 0, _len6 = l.length; _n < _len6; _n++) {
                    c = l[_n];
                    if (c === '\t') {
                      lind++;
                    } else {
                      break;
                    }
                  }
                  rind = indent + (lind - ind);
                }
                if (rp[1] && _.trim(rp[1]) && _.trim(rp[1], ' ', '\t', '\r', '\n')) {
                  coffeeScript += "" + rp[1];
                }
              }
            } else {
              sarg = rp[1];
              jarg = null;
              if ((pos = sarg.indexOf('{')) > 0) {
                jarg = sarg.substr(pos);
                sarg = _.trim(sarg.substr(0, pos));
              }
              if (rp[0] === 'begin') {
                subs = subs + 1;
                coffeeScript += "" + br + "tmp = []" + br + "__r.ctls.push o: tmp, c: " + (JSON.stringify(sarg)) + ", args: " + jarg + br + "__r.o = tmp";
              } else if (rp[0] === 'end') {
                subs = subs - 1;
                coffeeScript += ("" + br + "tmp = __r.ctls.pop()" + br + "__r.o = ") + (subs ? "__r.ctls[" + (subs - 1) + "].o" : '__r.m');
                if (subs) {
                  coffeeScript += "" + br + "__r.p t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)";
                } else {
                  coffeeScript += "" + br + "__r.p @renderTag 'ctl', tmp.c, smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o";
                }
              } else if (subs) {
                coffeeScript += "" + br + "__r.p t: " + (JSON.stringify(rp[0])) + ", s: " + (JSON.stringify(sarg)) + ", a: " + jarg;
              } else {
                coffeeScript += "" + br + "__r.p @renderTag " + (JSON.stringify(rp[0])) + ", " + (JSON.stringify(sarg)) + ", " + jarg;
              }
            }
          }
        }
        coffeeScript += "\n" + (stimes('\t', indent - 1)) + "_html = __r.o.join ''\n" + (stimes('\t', indent - 1)) + "if $el\n" + (stimes('\t', indent)) + "$el.html _html\n" + (stimes('\t', indent - 1)) + "_html\n";
      }
      return coffeeScript;
    };
    Control.load = function(className, parent, args) {
      var parts;
      parts = className.split('_');
      require('../../_packs/' + parts.slice(0, parts.length - 1).join('/') + '/_ctl_' + _.last(parts));
      return new smio['Packs_' + className](null, parent, args);
    };
    Control.prototype.rc = function() {
      if (this.parent) {
        return this.parent.rc();
      } else {
        return this['requestContext'] || null;
      }
    };
    Control.util = {
      florette: '&#x273F;',
      jsVoid: 'javascript:void(0);'
    };
    Control.tagRenderers = {
      'arg': function(ctl, name) {
        return ctl.args[name];
      },
      'ctl': function(ctl, className, args, emptyIfMissing, retCtl) {
        var ctor, renderFunc, subCtl;
        subCtl = _.detect(ctl.controls, function(sc) {
          return sc.ctlID === args.id;
        });
        if ((!subCtl) && ((ctor = smio["Packs_" + (ctl.classNamespace()) + "_" + className]) || (ctor = smio["Packs_" + (ctl.classNamespace()) + "_Controls_" + className]) || (ctor = smio["Packs_Core_Controls_" + className]))) {
          ctl.controls.push(subCtl = new ctor(ctl.client, ctl, args));
          if (ctl.client) {
            ctl.client.allControls[subCtl.id()] = subCtl;
          }
        }
        if (retCtl) {
          return subCtl;
        } else if (subCtl) {
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
      'inner': function(ctl, name, args) {
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
      'r': function() {
        var args, ctl, name;
        ctl = arguments[0], name = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        return ctl.res.apply(ctl, [name].concat(__slice.call(args)));
      }
    };
    function Control(client, parent, args) {
      this.client = client;
      this.parent = parent;
      this.args = args;
      this.root = __bind(this.root, this);
      this.res = __bind(this.res, this);
      this.r = __bind(this.r, this);
      this.renderTag = __bind(this.renderTag, this);
      this.renderHtml = __bind(this.renderHtml, this);
      this.renderJsonTemplate = __bind(this.renderJsonTemplate, this);
      this.removeControl = __bind(this.removeControl, this);
      this.jsonTemplates_Label = __bind(this.jsonTemplates_Label, this);
      this.jsonTemplates_HasLabel = __bind(this.jsonTemplates_HasLabel, this);
      this.init = __bind(this.init, this);
      this.id = __bind(this.id, this);
      this.cssClass = __bind(this.cssClass, this);
      this.cssBaseClass = __bind(this.cssBaseClass, this);
      this.cls = __bind(this.cls, this);
      this.classPath = __bind(this.classPath, this);
      this.addControl = __bind(this.addControl, this);
      this.rc = __bind(this.rc, this);
      this.Control = __bind(this.Control, this);
      this.Control = __bind(this.Control, this);
      this.disabled = smio.iif(this.args.disabled);
      this.ctlID = this.args.id;
      this.controls = [];
      this.el = null;
    }
    Control.prototype.addControl = function(ctlSpec, args) {
      if (_.isString(ctlSpec)) {
        ctlSpec = smio.Control.load(ctlSpec, this, args);
      }
      this.el.append(ctlSpec.renderHtml());
      ctlSpec.onLoad();
      return ctlSpec;
    };
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
    Control.prototype.removeControl = function(ctl, auto) {
      var c, c1, c2, cid, delClings, delID, _i, _j, _len, _len2, _ref, _ref2, _results;
      if (this.parent && !(ctl != null)) {
        return this.parent.removeControl(this);
      } else if (ctl != null) {
        _ref = ctl.controls;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          ctl.removeControl(c, true);
        }
        if (!auto) {
          this.controls = _.reject(this.controls, function(c) {
            return c === ctl;
          });
          if (ctl.el) {
            if (ctl.el.hasClass('smio-fade')) {
              ctl.el.css({
                opacity: 0.05
              });
              setTimeout((function() {
                return ctl.el.remove();
              }), 500);
            } else {
              ctl.el.remove();
            }
          }
        }
        if (this.client) {
          if (this.client.allControls[cid = ctl.id()]) {
            this.client.allControls[cid] = void 0;
            delete this.client.allControls[cid];
          }
          delClings = [cid];
          _ref2 = this.client.controlClings;
          for (c1 in _ref2) {
            c2 = _ref2[c1];
            if (c2 === ctl) {
              delClings.push(c1);
            }
          }
          _results = [];
          for (_j = 0, _len2 = delClings.length; _j < _len2; _j++) {
            delID = delClings[_j];
            _results.push(this.client.controlClings[delID] ? (this.client.controlClings[delID] = void 0, delete this.client.controlClings[delID]) : void 0);
          }
          return _results;
        }
      }
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
      var args, i, lang, name, parts, resSet, resSets, ret, _ref, _ref2, _ref3;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      _ref = [this.root().args['lang'] || 'en', ''], lang = _ref[0], ret = _ref[1];
      if (((!args) || (!args.length)) && _.isArray(name) && (name.length > 1)) {
        args = name.slice(1);
        name = name[0];
      }
      if ((resSets = (this.client ? smio.resources : smio.inst.resourceSets))) {
        parts = this.classNamespace().split('_');
        for (i = _ref2 = parts.length - 1; _ref2 <= 0 ? i <= 0 : i >= 0; _ref2 <= 0 ? i++ : i--) {
          if ((resSet = resSets[parts.slice(0, (i + 1) || 9e9).join('_')]) && (ret = (this.client ? resSet[name] : resSet[lang][name]))) {
            break;
          }
        }
        if (!ret) {
          ret = this.client ? resSets.smoothio[name] : resSets.smoothio[lang][name];
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
          return (_ref3 = this.parent).res.apply(_ref3, [name].concat(__slice.call(args)));
        } else {
          return "!!RES::" + name + "!!";
        }
      }
    };
    Control.prototype.root = function() {
      if (this.parent) {
        return this.parent.root();
      } else {
        return this;
      }
    };
    return Control;
  })();
}).call(this);
