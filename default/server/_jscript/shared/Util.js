(function() {
  var node_fs, node_path, node_util, smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  node_fs = require('fs');
  node_path = require('path');
  node_util = require('util');
  smio = global.smoothio;
  smio.Util = (function() {
    function Util() {
      this.array = {};
      this.array.ensurePos = function(arr, val, pos) {
        var i, index, _ref, _ref2;
        if (pos <= arr.length && (index = arr.indexOf(val)) !== pos) {
          if (index >= 0) {
            for (i = index, _ref = arr.length; (index <= _ref ? i < _ref : i > _ref); (index <= _ref ? i += 1 : i -= 1)) {
              arr[i] = arr[i + 1];
            }
            arr.length--;
          }
          arr.length++;
          for (i = _ref2 = arr.length - 1; (_ref2 <= pos ? i < pos : i > pos); (_ref2 <= pos ? i += 1 : i -= 1)) {
            arr[i] = arr[i - 1];
          }
          arr[pos] = val;
        }
        return arr;
      };
      this.array.toObject = function(arr, keyGen) {
        var i, obj, v, _len;
        obj = {};
        for (i = 0, _len = arr.length; i < _len; i++) {
          v = arr[i];
          obj[keyGen(v, i)] = v;
        }
        return obj;
      };
      this.fs = {};
      this.fs.mkdirMode = 0777;
      this.fs.ensureDirs = function(srcDirPath, outDirPath) {
        return smio.walkDir(srcDirPath, null, null, null, null, null, true, __bind(function(curDirPath, _, relDirPath) {
          var path;
          path = node_path.join(outDirPath, relDirPath);
          if (!node_path.existsSync(path = node_path.join(outDirPath, relDirPath))) {
            return node_fs.mkdirSync(path, this.mkdirMode);
          }
        }, this));
      };
      this.fs.isPathMatch = __bind(function(path, pattern) {
        var begins, ends;
        if ((begins = this.string.beginsWith(pattern, '*')) && (ends = this.string.endsWith(pattern, '*'))) {
          return path.indexOf((pattern.substr(1, pattern.length - 2)) >= 0);
        } else if (begins) {
          return this.string.endsWith(path, pattern.substr(1));
        } else if (ends) {
          return this.string.beginsWith(path, pattern.substr(0, pattern.length - 1));
        } else {
          return path === pattern;
        }
      }, this);
      this.fs.readTextFile = function(path) {
        return node_fs.readFileSync(path, 'utf-8');
      };
      this.string = {};
      this.string.beginsWith = function(str, val) {
        return (str.indexOf(val)) === 0;
      };
      this.string.endsWith = function(str, val) {
        var pos;
        return (str.length >= val.length) && ((pos = str.indexOf(val)) >= 0) && (pos === str.length - val.length);
      };
      this.string.replace = function(str, replace) {
        var pos, repl, val;
        for (val in replace) {
          repl = replace[val];
          while ((pos = str.indexOf(val)) >= 0) {
            str = (str.substr(0, pos)) + repl + (str.substr(pos + val.length));
          }
        }
        return str;
      };
      this.string.times = function(str, times) {
        var s, x;
        s = '';
        for (x = 0; (0 <= times ? x < times : x > times); (0 <= times ? x += 1 : x -= 1)) {
          s = s + str;
        }
        return s;
      };
    }
    Util.prototype.formatDate = function(dt) {
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
    };
    Util.prototype.formatError = function(err, details, stack) {
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
    };
    Util.prototype.mergeConfigWithDefaults = function(cfg, defs) {
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
    };
    Util.prototype.randomInt = function(max) {
      return Math.floor(Math.random() * (max + 1));
    };
    Util.prototype.trueForAll = function(args) {
      var v, _i, _len;
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        v = args[_i];
        if (!v) {
          return false;
        }
      }
      return true;
    };
    Util.prototype.trueForSome = function(args) {
      var v, _i, _len;
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        v = args[_i];
        if (v) {
          return true;
        }
      }
      return false;
    };
    return Util;
  })();
}).call(this);
