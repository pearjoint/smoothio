(function() {
  var coffee, node_util, smio, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  _ = require('underscore');
  _.mixin(require('underscore.string'));
  coffee = require('coffee-script');
  node_util = require('util');
  smio = global.smoothio;
  smio.Control = (function() {
    Control.compile = function(inst, ctlContent, controlPath) {
      var baseName, br, c, className, coffeeScript, contentParts, decls, dyn, dynCmd, i, inDyn, ind, indent, isCmd, jarg, l, lastChar, lastContent, lind, lines, obj, oneUp, part, pathParts, pos, posC, posS, renderParts, rind, rp, sarg, stimes, subs, tmpPos, tmpPos2, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
      this.inst = inst;
      _ref = [false, '../', [], '', [], '', '', {}], inDyn = _ref[0], oneUp = _ref[1], contentParts = _ref[2], decls = _ref[3], renderParts = _ref[4], lastChar = _ref[5], lastContent = _ref[6], obj = _ref[7];
      pathParts = (controlPath.substr(0, controlPath.lastIndexOf('.'))).split('/');
      baseName = pathParts.slice(0, pathParts.length - 1).join('_');
      className = pathParts.join('_');
      if (ctlContent && '<' !== ctlContent.substr(0, 1)) {
        lines = [];
        _ref2 = ctlContent.split('\n');
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          l = _ref2[_i];
          lines.push(('#' !== l.substr(0, 1) ? '\t' : '') + l);
        }
        ctlContent = "<%script:\n" + (lines.join('\n')) + "\n%>";
      }
      for (_j = 0, _len2 = ctlContent.length; _j < _len2; _j++) {
        c = ctlContent[_j];
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
      for (_k = 0, _len3 = contentParts.length; _k < _len3; _k++) {
        part = contentParts[_k];
        if (part['s']) {
          renderParts.push(part['s']);
        } else if (dyn = part['d']) {
          _ref3 = ['', dyn.indexOf(':'), [dyn.indexOf(' '), dyn.indexOf('\t'), dyn.indexOf('\r'), dyn.indexOf('\n')]], dynCmd = _ref3[0], posC = _ref3[1], posS = _ref3[2];
          isCmd = (posC >= 0) && ((_.any((function() {
            var _l, _len4, _results;
            _results = [];
            for (_l = 0, _len4 = posS.length; _l < _len4; _l++) {
              tmpPos = posS[_l];
              _results.push((tmpPos >= 0) && (tmpPos > posC));
            }
            return _results;
          })())) || (_.all((function() {
            var _l, _len4, _results;
            _results = [];
            for (_l = 0, _len4 = posS.length; _l < _len4; _l++) {
              tmpPos2 = posS[_l];
              _results.push(tmpPos2 < 0);
            }
            return _results;
          })(), _.identity)));
          if (isCmd) {
            dynCmd = dyn.substr(0, posC);
            dyn = dyn.substr(posC + 1);
          } else if ((dyn.substr(0, 1)) === '=') {
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
      coffeeScript = "###\nAuto-generated from " + controlPath + "\n###\n" + "#if server" + "\nrequire '" + (smio.Util.String.times(oneUp, pathParts.length)) + "_jscript/shared/Control'\n" + "#endif" + "\nsmio = smoothio = global.smoothio\nclass smio.Packs_" + className + " extends smio.Control\n" + decls + "\n	constructor: (client, parent, args) ->\n		super client, parent, args, " + (JSON.stringify(baseName)) + ", " + (JSON.stringify(className)) + "\n		@jsSelf = \"smio.client.allControls['\" + @id() + \"']\"\n		@init()";
      if (renderParts && renderParts.length) {
        _ref4 = [-1, 3, 3, smio.Util.String.times], ind = _ref4[0], indent = _ref4[1], rind = _ref4[2], stimes = _ref4[3];
        subs = 0;
        coffeeScript += "\n\trenderHtml: ($el) ->\n\t\tif not @_html\n\t\t\t__r = ctls: [], m: []\n\t\t\t__r.o = __r.m\n";
        for (_l = 0, _len4 = renderParts.length; _l < _len4; _l++) {
          rp = renderParts[_l];
          br = "\n" + (stimes('\t', rind));
          if (_.isString(rp)) {
            coffeeScript += "" + br + "__r.o.push " + (JSON.stringify(rp));
          } else if ((_.isArray(rp)) && rp.length && rp.length > 1) {
            if (rp[0] === '=') {
              coffeeScript += "" + br + "__r.o.push " + rp[1];
            } else if (rp[0] === '_') {
              lines = rp[1].split('\n');
              rp[1] = '';
              if (lines && lines.length) {
                for (_m = 0, _len5 = lines.length; _m < _len5; _m++) {
                  l = lines[_m];
                  if (l && l.length && (_.trim(l))) {
                    if (ind < 0) {
                      ind = 0;
                      for (i = 0, _ref5 = l.length; 0 <= _ref5 ? i < _ref5 : i > _ref5; 0 <= _ref5 ? i++ : i--) {
                        if ((l.substr(i, 1)) === '\t') {
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
                  for (i = 0, _ref6 = l.length; 0 <= _ref6 ? i < _ref6 : i > _ref6; 0 <= _ref6 ? i++ : i--) {
                    if ((l.substr(i, 1)) === '\t') {
                      lind++;
                    } else {
                      break;
                    }
                  }
                  rind = indent + (lind - ind);
                }
                if (rp[1] && (_.trim(rp[1])) && (_.trim(rp[1], ' ', '\t', '\r', '\n'))) {
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
                  coffeeScript += "" + br + "__r.o.push t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)";
                } else {
                  coffeeScript += "" + br + "__r.o.push @renderTag 'ctl', tmp.c, smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o";
                }
              } else if (subs) {
                coffeeScript += "" + br + "__r.o.push t: " + (JSON.stringify(rp[0])) + ", s: " + (JSON.stringify(sarg)) + ", a: " + jarg;
              } else {
                coffeeScript += "" + br + "__r.o.push @renderTag " + (JSON.stringify(rp[0])) + ", " + (JSON.stringify(sarg)) + ", " + jarg;
              }
            }
          }
        }
        coffeeScript += "\n" + (stimes('\t', indent)) + "@_html = __r.o.join ''\n" + (stimes('\t', indent - 1)) + "if $el\n" + (stimes('\t', indent)) + "$el.html @_html\n" + (stimes('\t', indent - 1)) + "@_html\n";
      }
      return coffeeScript;
    };
    Control.load = function(className, parent, args) {
      var ctor, parts, path;
      parts = className.split('_');
      path = '../../_packs/' + (parts.slice(0, parts.length - 1).join('/')) + '/_smioctl_' + _.last(parts);
      require(path);
      ctor = smio['Packs_' + className];
      return new ctor(null, parent, args);
    };
    Control.tagRenderers = {
      "arg": function(ctl, name) {
        return ctl.args[name];
      },
      "ctl": function(ctl, className, args, emptyIfMissing) {
        var ctor;
        if ((!ctl.controls[args.id]) && ((ctor = smio['Packs_' + ctl.baseName + '_' + className]) || (ctor = smio['Packs_' + ctl.baseName + '_Controls_' + className]) || (ctor = smio['Packs_Core_Controls_' + className]))) {
          ctl.client.allControls[args.id] = ctl.controls[args.id] = new ctor(ctl.client, ctl, args);
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
    Control.prototype.r = function(name) {
      return this.res(name);
    };
    Control.prototype.res = function(name) {
      var i, parts, resSet, resSets, ret, _ref;
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
