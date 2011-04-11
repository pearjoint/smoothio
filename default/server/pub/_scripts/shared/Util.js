(function() {
  var smio;
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
