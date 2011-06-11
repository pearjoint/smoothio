(function() {
  var smio;
  smio = global.smoothio;
  smio.Util = (function() {
    function Util() {}
    Util.Array = {
      add: function(arr, val) {
        var copy;
        copy = _.clone(arr);
        copy.push(val);
        return copy;
      },
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
      removeLast: function(arr) {
        return arr.slice(0, arr.length - 1);
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
    Util.DateTime = {
      addMinutes: function(minutes, dt) {
        if (!dt) {
          dt = new Date();
        }
        dt.setTime(dt.getTime() + (minutes * 60 * 1000));
        return dt;
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
          if ((v + '').length !== 1) {
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
      randomInt: function(max) {
        return Math.floor(Math.random() * (max + 1));
      },
      smallest: function(arr) {
        var n, num, _i, _len;
        num = void 0;
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          n = arr[_i];
          if ((!(num != null)) || (n < num)) {
            num = n;
          }
        }
        return num;
      },
      tryParseInt: function(val, def) {
        var num;
        num = parseInt(val + '');
        if (_.isNumber(num)) {
          return num;
        } else {
          return def;
        }
      }
    };
    Util.Object = {
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
      htmlEncode: function(str) {
        var cc, i, len, ret, tmp, _ref;
        _ref = ['', _.escapeHTML(str)], ret = _ref[0], tmp = _ref[1];
        len = tmp.length;
        for (i = 0; 0 <= len ? i < len : i > len; 0 <= len ? i++ : i--) {
          if ((cc = tmp.charCodeAt(i)) > 127) {
            ret += "&#" + cc + ";";
          } else {
            ret += tmp.substr(i, 1);
          }
        }
        return ret;
      },
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
    return Util;
  })();
}).call(this);
