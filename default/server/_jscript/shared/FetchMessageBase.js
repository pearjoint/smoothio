(function() {
  var smio, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  _ = require('underscore');
  require('./Util');
  smio = global.smoothio;
  smio.FetchMessageBase = (function() {
    function FetchMessageBase(msg, funcs) {
      this.ticks = __bind(this.ticks, this);
      this.settings = __bind(this.settings, this);
      this.merge = __bind(this.merge, this);
      this.ctlID = __bind(this.ctlID, this);
      this.cmd = __bind(this.cmd, this);
      this.clear = __bind(this.clear, this);
      this._named = __bind(this._named, this);      var args, name;
      if (msg instanceof smio.FetchMessageBase) {
        this.msg = msg.msg;
      } else {
        this.msg = msg;
      }
      if (!this.msg) {
        this.msg = {};
      }
      for (name in funcs) {
        args = funcs[name];
        this[name].apply(this, (_.isArray(args) ? args : [args]));
      }
    }
    FetchMessageBase.prototype._named = function(name, arg) {
      var v, _i, _len, _ref;
      if (arg && !_.isString(arg)) {
        if (!this.msg[name]) {
          this.msg[name] = arg;
        } else if (!_.isArray(arg)) {
          this.msg[name] = smio.Util.Object.mergeDefaults(this.msg[name], arg);
        } else if (_.isArray(this.msg[name])) {
          for (_i = 0, _len = arg.length; _i < _len; _i++) {
            v = arg[_i];
            if (!(__indexOf.call(this.msg[name], v) >= 0)) {
              this.msg[name].push(v);
            }
          }
        } else {
          this.msg[named] = arg;
        }
      }
      if (_.isString(arg)) {
        return (_ref = this.msg[name]) != null ? _ref[arg] : void 0;
      } else {
        return this.msg[name];
      }
    };
    FetchMessageBase.prototype.clear = function() {
      var k, _results;
      _results = [];
      for (k in this.msg) {
        this.msg[k] = null;
        _results.push(delete this.msg[k]);
      }
      return _results;
    };
    FetchMessageBase.prototype.cmd = function(cmdName) {
      if (cmdName) {
        this.msg._c = cmdName;
      }
      return this.msg._c;
    };
    FetchMessageBase.prototype.ctlID = function(ctlID) {
      if (ctlID) {
        this.msg._i = ctlID;
      }
      return this.msg._i;
    };
    FetchMessageBase.prototype.merge = function(fm) {
      var k, v, _ref, _results;
      _ref = fm.msg;
      _results = [];
      for (k in _ref) {
        v = _ref[k];
        _results.push(this.msg[k] = v);
      }
      return _results;
    };
    FetchMessageBase.prototype.settings = function(cfg) {
      return this._named('_s', cfg);
    };
    FetchMessageBase.prototype.ticks = function(ticks) {
      if (ticks != null) {
        this.msg._t = ticks;
      }
      return this.msg._t;
    };
    return FetchMessageBase;
  })();
}).call(this);
