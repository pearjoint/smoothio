(function() {
  var node_fs, node_path, node_util, smio, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
          if (!cfg) {
            cfg = {};
          }
          for (defKey in defs) {
            defVal = defs[defKey];
            if ((!(cfg[defKey] != null)) || (typeof cfg[defKey] !== typeof defVal)) {
              cfg[defKey] = defVal;
            } else if ((typeof cfg[defKey] === 'object') && (typeof defVal === 'object')) {
              cfg[defKey] = this.mergeConfigWithDefaults(cfg[defKey], defVal);
            }
          }
          return cfg;
        },
        parseCookies: function(cookies) {
          var c, cookie, parts, _i, _len, _ref;
          c = {};
          if (cookies) {
            _ref = cookies.split(';');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              cookie = _ref[_i];
              if ((parts = cookie.split('=')) && parts.length) {
                c[parts[0]] = parts.length > 1 ? parts[1] : '';
              }
            }
          }
          return c;
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
