(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  smio = global.smoothio;
  smio.FetchMessageBase = (function() {
    function FetchMessageBase(msg, funcs) {
      var args, name;
      this.msg = msg;
      this.ticks = __bind(this.ticks, this);
      this.settings = __bind(this.settings, this);
      this.clear = __bind(this.clear, this);
      if (!this.msg) {
        this.msg = {};
      }
      for (name in funcs) {
        args = funcs[name];
        this[name].apply(this, args);
      }
    }
    FetchMessageBase.prototype.clear = function() {
      var k, _results;
      _results = [];
      for (k in this.msg) {
        this.msg[k] = null;
        _results.push(delete this.msg[k]);
      }
      return _results;
    };
    FetchMessageBase.prototype.settings = function(cfg) {
      var v, _i, _len, _ref;
      if (cfg && !_.isString(cfg)) {
        if (!this.msg.s) {
          this.msg.s = cfg;
        } else if (!_.isArray(cfg)) {
          this.msg.s = smio.Util.Object.mergeDefaults(this.msg.s, cfg);
        } else if (_.isArray(this.msg.s)) {
          for (_i = 0, _len = cfg.length; _i < _len; _i++) {
            v = cfg[_i];
            if (!(__indexOf.call(this.msg.s, v) >= 0)) {
              this.msg.s.push(v);
            }
          }
        } else {
          this.msg.s = cfg;
        }
      }
      if (_.isString(cfg)) {
        return (_ref = this.msg.s) != null ? _ref[cfg] : void 0;
      } else {
        return this.msg.s;
      }
    };
    FetchMessageBase.prototype.ticks = function(ticks) {
      if (ticks != null) {
        this.msg.t = ticks;
      }
      return this.msg.t;
    };
    return FetchMessageBase;
  })();
}).call(this);
