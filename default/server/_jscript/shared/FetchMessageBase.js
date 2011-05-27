(function() {
  var smio;
  smio = global.smoothio;
  smio.FetchMessageBase = (function() {
    function FetchMessageBase(msg, funcs) {
      var args, name;
      this.msg = msg;
      if (!this.msg) {
        this.msg = {};
      }
      for (name in funcs) {
        args = funcs[name];
        this[name].apply(this, args);
      }
    }
    FetchMessageBase.prototype.clear = function() {
      var k, _i, _len, _ref, _results;
      _ref = this.msg;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        this.msg[k] = null;
        _results.push(delete this.msg[k]);
      }
      return _results;
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
