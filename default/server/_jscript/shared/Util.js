(function() {
  var node_fs, node_path, node_util, smio, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  _ = require('underscore');
  _.mixin(require('underscore.string'));
  node_util = require('util');
  smio = global.smoothio;
  smio.Control = (function() {
    function Control() {}
    Control.compile = function(inst, ctlContent, controlPath) {
      var c, className, coffeeScript, contentParts, decls, dyn, dynCmd, i, inDyn, ind, indent, isCmd, jarg, l, lastChar, lastContent, lines, obj, oneUp, part, pathParts, pos, posC, posS, renderParts, rind, rp, sarg, stimes, tmpPos, tmpPos2, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4;
      this.inst = inst;
      _ref = [false, '../', [], '', [], '', '', {}], inDyn = _ref[0], oneUp = _ref[1], contentParts = _ref[2], decls = _ref[3], renderParts = _ref[4], lastChar = _ref[5], lastContent = _ref[6], obj = _ref[7];
      pathParts = (controlPath.substr(0, controlPath.lastIndexOf('.'))).split('/');
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
      coffeeScript = "###\nAuto-generated from " + controlPath + "\n###\n" + "#if server" + "\nrequire '" + (this.inst.util.string.times(oneUp, pathParts.length)) + "_jscript/Control'\n" + "#endif" + "\nsmio = smoothio = global.smoothio\nclass smio.Packs_" + className + " extends smio.Control\n" + decls + "\n" + "#if client" + "\n	renderHtml: ->\n		if not @_html\n			parts = []";
      _ref3 = [-1, 3, 3, this.inst.util.string.times], ind = _ref3[0], indent = _ref3[1], rind = _ref3[2], stimes = _ref3[3];
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
      coffeeScript += "\n" + (stimes('\t', indent)) + "@_html = parts.join ''\n" + (stimes('\t', indent - 1)) + "@_html\n" + "#endif" + "\n";
      return coffeeScript;
    };
    return Control;
  })();
  _ = require('underscore');
  _.mixin(require('underscore.string'));
  node_fs = require('fs');
  node_path = require('path');
  node_util = require('util');
  smio = global.smoothio;
  smio.Util = (function() {
    function Util() {
      this.array = {
        ensurePos: function(arr, val, pos) {
          var i, index, _ref, _ref2;
          if (pos <= arr.length && (index = arr.indexOf(val)) !== pos) {
            if (index >= 0) {
              for (i = index, _ref = arr.length; index <= _ref ? i < _ref : i > _ref; index <= _ref ? i++ : i--) {
                arr[i] = arr[i + 1];
              }
              arr.length--;
            }
            arr.length++;
            for (i = _ref2 = arr.length - 1; _ref2 <= pos ? i < pos : i > pos; _ref2 <= pos ? i++ : i--) {
              arr[i] = arr[i - 1];
            }
            arr[pos] = val;
          }
          return arr;
        },
        toObject: function(arr, keyGen) {
          var i, obj, v, _len;
          obj = {};
          for (i = 0, _len = arr.length; i < _len; i++) {
            v = arr[i];
            obj[keyGen(v, i)] = v;
          }
          return obj;
        }
      };
      this.datetime = {
        toString: function(dt) {
          var pad;
          pad = function(fn, inc) {
            var v;
            v = typeof fn !== 'function' ? fn : fn.apply(dt);
            if ((inc != null) && inc > 0) {
              v = v + inc;
            }
            if ((v + '').length !== 1) {
              return v;
            } else {
              return '0' + v;
            }
          };
          return "" + (dt.getFullYear()) + "-" + (pad(dt.getMonth, 1)) + "-" + (pad(dt.getDate)) + "-" + (pad(dt.getHours)) + "-" + (dt.getMinutes()) + "-" + (dt.getSeconds());
        }
      };
      this.fs = {
        mkdirMode: 0777,
        ensureDirs: function(srcDirPath, outDirPath) {
          return smio.walkDir(srcDirPath, null, null, null, null, null, true, __bind(function(curDirPath, _, relDirPath) {
            var path;
            path = node_path.join(outDirPath, relDirPath);
            if (!node_path.existsSync(path = node_path.join(outDirPath, relDirPath))) {
              return node_fs.mkdirSync(path, this.mkdirMode);
            }
          }, this));
        },
        isPathMatch: __bind(function(path, pattern) {
          var begins, ends;
          if ((begins = _.isStartsWith(pattern, '*')) && (ends = _.isEndsWith(pattern, '*'))) {
            return path.indexOf((pattern.substr(1, pattern.length - 2)) >= 0);
          } else if (begins) {
            return _.isEndsWith(path, pattern.substr(1));
          } else if (ends) {
            return _.isStartsWith(path, pattern.substr(0, pattern.length - 1));
          } else {
            return path === pattern;
          }
        }, this),
        readTextFile: function(path) {
          return node_fs.readFileSync(path, 'utf-8');
        }
      };
      this.inst = {
        formatError: function(err, details, stack) {
          var lines, name, val;
          if (details) {
            lines = [];
            for (name in err) {
              val = err[name];
              if ((name != null) && (val != null) && name !== (stack ? 'message' : 'stack')) {
                lines.push("\t" + name + ": " + val);
              }
            }
            return lines.join('\n');
          } else if (stack && (err['stack'] != null)) {
            return (err['ml_error_filepath'] != null ? '[ ' + err['ml_error_filepath'] + ' ] -- ' : '') + err.stack;
          } else {
            return (err['ml_error_filepath'] != null ? '[ ' + err['ml_error_filepath'] + ' ] -- ' : '') + err;
          }
        },
        mergeConfigWithDefaults: function(cfg, defs) {
          var defKey, defVal;
          for (defKey in defs) {
            defVal = defs[defKey];
            if ((!(cfg[defKey] != null)) || (typeof cfg[defKey] !== typeof defVal)) {
              cfg[defKey] = defVal;
            } else if ((typeof cfg[defKey] === 'object') && (typeof defVal === 'object')) {
              cfg[defKey] = this.mergeConfigWithDefaults(cfg[defKey], defVal);
            }
          }
          return cfg;
        }
      };
      this.math = {
        randomInt: function(max) {
          return Math.floor(Math.random() * (max + 1));
        }
      };
      this.string = {
        replace: function(str, replace) {
          var pos, repl, val;
          for (val in replace) {
            repl = replace[val];
            while ((pos = str.indexOf(val)) >= 0) {
              str = (str.substr(0, pos)) + repl + (str.substr(pos + val.length));
            }
          }
          return str;
        },
        times: function(str, times) {
          var a, x;
          a = new Array(times);
          for (x = 0; 0 <= times ? x < times : x > times; 0 <= times ? x++ : x--) {
            a[x] = str;
          }
          return a.join('');
        }
      };
    }
    return Util;
  })();
}).call(this);
