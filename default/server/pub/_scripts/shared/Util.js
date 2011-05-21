(function() {
  var smio;
  smio = global.smoothio;
  smio.Control = (function() {
    function Control() {
      this._html = '';
    }
    Control.prototype.renderHtml = function() {
      return this._html;
    };
    Control.prototype.renderTag = function(name, sarg, jarg) {
      return name;
    };
    return Control;
  })();
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
