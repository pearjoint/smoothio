(function() {
  var coffee, node_util, smio, _;
  _ = require('underscore');
  _.mixin(require('underscore.string'));
  coffee = require('coffee-script');
  node_util = require('util');
  smio = global.smoothio;
  smio.Control = (function() {
    function Control() {}
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
      coffeeScript = "###\nAuto-generated from " + controlPath + "\n###\n" + "#if server" + "\nrequire '" + (smio.Util.String.times(oneUp, pathParts.length)) + "_jscript/Control'\n" + "#endif" + "\nsmio = smoothio = global.smoothio\nclass smio.Packs_" + className + " extends smio.Control\n" + decls + "\n" + "#if client" + "\n	constructor: (client, parent, args) ->\n		super client, parent, args, " + (JSON.stringify(baseName)) + ", " + (JSON.stringify(className)) + "\n		@jsSelf = \"smio.client.allControls['\" + @id() + \"']\"\n		@init()";
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
        coffeeScript += "\n" + (stimes('\t', indent)) + "@_html = __r.o.join ''\n" + (stimes('\t', indent - 1)) + "if $el\n" + (stimes('\t', indent)) + "$el.html @_html\n" + (stimes('\t', indent - 1)) + "@_html\n" + "#endif" + "\n";
      }
      return coffeeScript;
    };
    Control.prototype.r = function(name) {
      return this.res(name);
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
