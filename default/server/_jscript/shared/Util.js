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
    function Util() {}
    Util.Array = {
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
      }
    };
    Util.Number = {
      randomInt: function(max) {
        return Math.floor(Math.random() * (max + 1));
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
    Util.FileSystem = {
      mkdirMode: 0777,
      ensureDirs: function(srcDirPath, outDirPath) {
        return smio.walkDir(srcDirPath, null, null, null, null, null, true, __bind(function(curDirPath, _, relDirPath) {
          var path;
          path = node_path.join(outDirPath, relDirPath);
          if (!node_path.existsSync(path = node_path.join(outDirPath, relDirPath))) {
            return node_fs.mkdirSync(path, smio.Util.FileSystem.mkdirMode);
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
      }, Util),
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
          return (err['ml_error_filepath'] != null ? '[ ' + err['ml_error_filepath'] + ' ] -- ' : '') + err.stack;
        } else {
          return (err['ml_error_filepath'] != null ? '[ ' + err['ml_error_filepath'] + ' ] -- ' : '') + err;
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
            if (_.isEndsWith(time, '"')) {
              time = time.substr(0, time.length - 1);
            }
            if (_.isStartsWith(time, '"')) {
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
  }).call(this);
}).call(this);
