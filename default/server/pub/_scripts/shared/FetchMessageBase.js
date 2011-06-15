(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
      if (cfg) {
        this.msg.s = cfg;
      }
      return this.msg.s;
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
