(function() {
  var node_util, smio, _;
  _ = require('underscore');
  _.mixin(require('underscore.string'));
  node_util = require('util');
  smio = global.smoothio;
  smio.Control = (function() {
    function Control() {}
    Control.compile = function(inst, ctlContent, controlPath) {
      var baseName, c, className, coffeeScript, contentParts, decls, dyn, dynCmd, i, inDyn, ind, indent, isCmd, jarg, l, lastChar, lastContent, lines, obj, oneUp, part, pathParts, pos, posC, posS, renderParts, rind, rp, sarg, stimes, tmpPos, tmpPos2, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4;
      this.inst = inst;
      _ref = [false, '../', [], '', [], '', '', {}], inDyn = _ref[0], oneUp = _ref[1], contentParts = _ref[2], decls = _ref[3], renderParts = _ref[4], lastChar = _ref[5], lastContent = _ref[6], obj = _ref[7];
      pathParts = (controlPath.substr(0, controlPath.lastIndexOf('.'))).split('/');
      baseName = pathParts.slice(0, pathParts.length - 1).join('_');
      className = pathParts.join('_');
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
          isCmd = (posC >= 0) && ((_.any((function() {
            var _k, _len3, _results;
            _results = [];
            for (_k = 0, _len3 = posS.length; _k < _len3; _k++) {
              tmpPos = posS[_k];
              _results.push((tmpPos >= 0) && (tmpPos > posC));
            }
            return _results;
          })())) || (_.all((function() {
            var _k, _len3, _results;
            _results = [];
            for (_k = 0, _len3 = posS.length; _k < _len3; _k++) {
              tmpPos2 = posS[_k];
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
      coffeeScript = "###\nAuto-generated from " + controlPath + "\n###\n" + "#if server" + "\nrequire '" + (smio.Util.String.times(oneUp, pathParts.length)) + "_jscript/Control'\n" + "#endif" + "\nsmio = smoothio = global.smoothio\nclass smio.Packs_" + className + " extends smio.Control\n" + decls + "\n" + "#if client" + "\n	constructor: (client, args) ->\n		super client, args, " + (JSON.stringify(baseName)) + ", " + (JSON.stringify(className)) + "\n		@init()\n\n	renderHtml: ($el) ->\n		if not @_html\n			parts = []";
      _ref3 = [-1, 3, 3, smio.Util.String.times], ind = _ref3[0], indent = _ref3[1], rind = _ref3[2], stimes = _ref3[3];
      for (_k = 0, _len3 = renderParts.length; _k < _len3; _k++) {
        rp = renderParts[_k];
        if (_.isString(rp)) {
          coffeeScript += "\n" + (stimes('\t', rind)) + "parts.push " + (JSON.stringify(rp));
        } else if ((_.isArray(rp)) && rp.length && rp.length > 1) {
          if (rp[0] === '=') {
            coffeeScript += "\n" + (stimes('\t', rind)) + "parts.push " + rp[1];
          } else if (rp[0] === '_') {
            lines = rp[1].split('\n');
            rp[1] = '';
            for (_l = 0, _len4 = lines.length; _l < _len4; _l++) {
              l = lines[_l];
              if (l && l.length) {
                if (ind < 0) {
                  ind = 0;
                  for (i = 0, _ref4 = l.length; 0 <= _ref4 ? i < _ref4 : i > _ref4; 0 <= _ref4 ? i++ : i--) {
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
            if (rp[1] && (_.trim(rp[1])) && (_.trim(rp[1], ' ', '\t', '\r', '\n'))) {
              coffeeScript += "" + rp[1];
            }
          } else {
            sarg = rp[1];
            jarg = null;
            if ((pos = sarg.indexOf('{')) > 0) {
              jarg = sarg.substr(pos);
              sarg = _.trim(sarg.substr(0, pos));
            }
            coffeeScript += "\n" + (stimes('\t', rind)) + "parts.push @renderTag " + (JSON.stringify(rp[0])) + ", " + (JSON.stringify(sarg)) + ", " + jarg;
          }
        }
      }
      coffeeScript += "\n" + (stimes('\t', indent)) + "@_html = parts.join ''\n" + (stimes('\t', indent - 1)) + "if $el\n" + (stimes('\t', indent)) + "$el.html @_html\n" + (stimes('\t', indent - 1)) + "@_html\n" + "#endif" + "\n";
      return coffeeScript;
    };
    return Control;
  })();
}).call(this);
