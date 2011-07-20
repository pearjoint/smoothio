(function() {
  var node_fs, node_path, node_util, smio, _;
  var __slice = Array.prototype.slice, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  _ = require('underscore');
  _.mixin(require('underscore.string'));
  node_fs = require('fs');
  node_path = require('path');
  node_util = require('util');
  smio = global.smoothio;
  smio.Util = (function() {
    function Util() {}
    Util.Array = {
      add: function() {
        var arr, copy, v, vals, _i, _len;
        arr = arguments[0], vals = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        copy = _.clone(arr);
        for (_i = 0, _len = vals.length; _i < _len; _i++) {
          v = vals[_i];
          copy.push(v);
        }
        return copy;
      },
      ensure: function() {
        var arr, v, vals, _i, _len, _ref;
        arr = arguments[0], vals = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        for (_i = 0, _len = vals.length; _i < _len; _i++) {
          v = vals[_i];
          if (_ref = !v, __indexOf.call(arr, _ref) >= 0) {
            arr.push(v);
          }
        }
        return arr;
      },
      ensurePos: function(arr, val, pos) {
        var i, index, v, _len, _ref;
        if ((pos <= arr.length) && ((index = arr.indexOf(val)) !== pos)) {
          if (index >= 0) {
            for (i = 0, _len = arr.length; i < _len; i++) {
              v = arr[i];
              arr[i] = arr[i + 1];
            }
            arr.length--;
          }
          arr.length++;
          for (i = _ref = arr.length - 1; _ref <= pos ? i < pos : i > pos; _ref <= pos ? i++ : i--) {
            arr[i] = arr[i - 1];
          }
          arr[pos] = val;
        }
        return arr;
      },
      "in": function(val, arr) {
        return __indexOf.call(arr, val) >= 0;
      },
      removeLast: function(arr) {
        return arr.slice(0, arr.length - 1);
      },
      toObject: function(arr, keyGen, valGen) {
        var i, obj, v, _len;
        obj = {};
        for (i = 0, _len = arr.length; i < _len; i++) {
          v = arr[i];
          obj[keyGen ? keyGen(v, i) : i] = valGen ? valGen(v, i) : v;
        }
        return obj;
      }
    };
    Util.DateTime = {
      addMinutes: function(minutes, dt) {
        if (!dt) {
          dt = new Date();
        }
        dt.setTime(dt.getTime() + (minutes * 60 * 1000));
        return dt;
      },
      stringify: function(dt) {
        var s;
        if (!dt) {
          dt = new Date();
        }
        s = JSON.stringify(dt);
        if (_.startsWith(s, '"') && _.endsWith(s, '"')) {
          return s.substr(1, s.length - 2);
        } else {
          return s;
        }
      },
      ticks: function(dt) {
        if (!dt) {
          dt = new Date();
        }
        return dt.getTime();
      },
      toString: function(dt) {
        var pad;
        if (!dt) {
          dt = new Date();
        }
        pad = function(fn, inc) {
          var v;
          v = typeof fn !== 'function' ? fn : fn.apply(dt);
          if ((inc != null) && inc > 0) {
            v = v + inc;
          }
          if (("" + v).length !== 1) {
            return v;
          } else {
            return '0' + v;
          }
        };
        return "" + (dt.getFullYear()) + "-" + (pad(dt.getMonth, 1)) + "-" + (pad(dt.getDate)) + "-" + (pad(dt.getHours)) + "-" + (dt.getMinutes()) + "-" + (dt.getSeconds());
      },
      utcTicks: function(dt) {
        if (!dt) {
          dt = new Date();
        }
        return Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds());
      }
    };
    Util.Runtime = {
      parallel: function(funs, finish) {
        var checkDone, done, fn, len, _i, _len, _results;
        len = funs.length;
        done = 0;
        checkDone = function() {
          if ((++done) === len) {
            return finish();
          }
        };
        _results = [];
        for (_i = 0, _len = funs.length; _i < _len; _i++) {
          fn = funs[_i];
          _results.push(fn(checkDone));
        }
        return _results;
      }
    };
    Util.Number = {
      max: function() {
        return Math.pow(2, 31) - 1;
      },
      min: function() {
        return Math.pow(-2, 31);
      },
      randomInt: function(max) {
        return Math.floor(Math.random() * (max + 1));
      },
      secant: function(n) {
        return 1 / Math.cos(n);
      },
      sinh: function(n) {
        return (Math.exp(n) - Math.exp(-n)) / 2;
      },
      toOtherSign: function(test, val) {
        if (test < 0) {
          return Math.abs(val);
        } else if (val <= 0) {
          return val;
        } else {
          return -val;
        }
      },
      toSameSign: function(test, val) {
        if (test >= 0) {
          return Math.abs(val);
        } else if (val <= 0) {
          return val;
        } else {
          return -val;
        }
      },
      tryParse: function(val, def, validate) {
        var num;
        num = parseInt("" + val);
        if (validate && !validate(num)) {
          num = def;
        }
        if (_.isNumber(num)) {
          return num;
        } else {
          return def;
        }
      }
    };
    Util.Object = {
      cloneFiltered: function(obj, fn) {
        var k, noFunc, o, v, _ref;
        _ref = [!_.isFunction(fn), {}], noFunc = _ref[0], o = _ref[1];
        for (k in obj) {
          v = obj[k];
          if (noFunc || fn(k, v)) {
            o[k] = v;
          }
        }
        return o;
      },
      empty: function(obj) {
        var p;
        for (p in obj) {
          return false;
        }
        return true;
      },
      exclude: function() {
        var keys, obj;
        obj = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return smio.Util.Object.cloneFiltered(obj, function(k, v) {
          return !(__indexOf.call(keys, k) >= 0);
        });
      },
      isObject: function(o, checkArr) {
        return (typeof o === 'object') && ((!checkArr) || !_.isArray(o));
      },
      mergeDefaults: function(cfg, defs) {
        var defKey, defVal;
        if (!cfg) {
          cfg = {};
        }
        for (defKey in defs) {
          defVal = defs[defKey];
          if ((!(cfg[defKey] != null)) || (typeof cfg[defKey] !== typeof defVal)) {
            cfg[defKey] = defVal;
          } else if ((typeof cfg[defKey] === 'object') && (typeof defVal === 'object')) {
            cfg[defKey] = smio.Util.Object.mergeDefaults(cfg[defKey], defVal);
          }
        }
        return cfg;
      },
      select: function(obj, path) {
        var last, p, parts, _i, _len;
        parts = path ? path.split('.') : null;
        last = path ? obj : null;
        if (parts && last) {
          for (_i = 0, _len = parts.length; _i < _len; _i++) {
            p = parts[_i];
            if (!(last = last[p])) {
              break;
            }
          }
        }
        return last;
      }
    };
    Util.String = {
      namedHtmlEntities: {
        'ß': 'szlig',
        'ä': 'auml',
        'Ä': 'Auml',
        'ö': 'ouml',
        'Ö': 'Ouml',
        'ü': 'uuml',
        'Ü': 'Uuml'
      },
      htmlEncode: function(str) {
        var c, cc, ent, i, len, ret, tmp, _len, _ref;
        _ref = ['', _.escapeHTML(str)], ret = _ref[0], tmp = _ref[1];
        len = tmp.length;
        for (i = 0, _len = tmp.length; i < _len; i++) {
          c = tmp[i];
          if ((ent = smio.Util.String.namedHtmlEntities[c])) {
            ret += "&" + ent + ";";
          } else if ((cc = tmp.charCodeAt(i)) > 127) {
            ret += "&#" + cc + ";";
          } else {
            ret += c;
          }
        }
        return ret;
      },
      idify: function(str) {
        return smio.Util.String.urlify(str, '', '', true);
      },
      "in": function(c, s) {
        return __indexOf.call(s, c) >= 0;
      },
      replace: function(str, replace) {
        var pos, repl, val;
        for (val in replace) {
          repl = replace[val];
          while ((pos = str.indexOf(val)) >= 0) {
            str = str.substr(0, pos) + repl + str.substr(pos + val.length);
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
      },
      urlify: function(s, e, al, noLower) {
        var a, c, l, o, r, tc, tmp, _i, _len, _ref;
        if (e == null) {
          e = '-';
        }
        if (al == null) {
          al = '/';
        }
        _ref = [
          '', '', '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' + al, {
            'ä': 'ae',
            'ö': 'oe',
            'ü': 'ue',
            'Ä': 'Ae',
            'Ö': 'Oe',
            'Ü': 'Ue',
            'ß': 'ss'
          }
        ], l = _ref[0], o = _ref[1], a = _ref[2], r = _ref[3];
        for (_i = 0, _len = s.length; _i < _len; _i++) {
          c = s[_i];
          if (__indexOf.call(a, c) >= 0) {
            o += (l = c);
          } else if ((tc = r[c])) {
            o += (l = tc);
          } else if (e && (l !== e)) {
            o += (l = e);
          }
        }
        tmp = _.trim(o, "/" + e);
        if (noLower) {
          return tmp;
        } else {
          return tmp.toLowerCase();
        }
      }
    };
    Util.FileSystem = {
      mkdirMode: 0777,
      ensureDirs: function(srcDirPath, outDirPath) {
        return smio.walkDir(srcDirPath, null, null, null, null, null, true, function(curDirPath, _, relDirPath) {
          var path;
          path = node_path.join(outDirPath, relDirPath);
          if (!node_path.existsSync(path = node_path.join(outDirPath, relDirPath))) {
            return node_fs.mkdirSync(path, smio.Util.FileSystem.mkdirMode);
          }
        });
      },
      isPathMatch: function(path, pattern) {
        var begins, ends, _ref;
        if ((begins = _.startsWith(pattern, '*')) && (ends = _.endsWith(pattern, '*'))) {
          return _ref = pattern.substr(1, pattern.length - 2), __indexOf.call(path, _ref) >= 0;
        } else if (begins) {
          return _.endsWith(path, pattern.substr(1));
        } else if (ends) {
          return _.startsWith(path, pattern.substr(0, pattern.length - 1));
        } else {
          return path === pattern;
        }
      },
      readTextFile: function(path) {
        return node_fs.readFileSync(path, 'utf-8');
      }
    };
    Util.Server = {
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
          return (err['ml_error_filepath'] != null ? "[ " + err['ml_error_filepath'] + " ] -- " : '') + err.stack;
        } else {
          return (err['ml_error_filepath'] != null ? "[ " + err['ml_error_filepath'] + " ] -- " : '') + err;
        }
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
      },
      setupLogFile: function(owner, propName, smioBuf, logPath, oldLogFunc) {
        if (logPath) {
          try {
            node_fs.unlinkSync(logPath);
          } catch (_e) {}
          return function(line, cat) {
            var closeLog, full, time;
            closeLog = function() {
              try {
                owner[propName].end();
              } catch (_e) {}
              try {
                owner[propName].destroySoon();
              } catch (_e) {}
              return owner[propName] = null;
            };
            full = '';
            if (smioBuf && smio['logBuffer']) {
              full = smio.logBuffer.join('\n') + '\n';
              delete smio.logBuffer;
            }
            if (owner[propName] && !owner[propName].writable) {
              closeLog();
            }
            if (!owner[propName]) {
              owner[propName] = node_fs.createWriteStream(logPath, {
                encoding: 'utf-8',
                mode: 0666
              });
              owner[propName].on('close', closeLog);
              owner[propName].on('error', closeLog);
            }
            time = JSON.stringify(new Date());
            if (_.endsWith(time, '"')) {
              time = time.substr(0, time.length - 1);
            }
            if (_.startsWith(time, '"')) {
              time = time.substr(1);
            }
            full += (line = time + ' - ' + oldLogFunc(line, cat) + '\n');
            try {
              return owner[propName].write(full);
            } catch (_e) {}
          };
        }
      }
    };
    return Util;
  })();
}).call(this);
