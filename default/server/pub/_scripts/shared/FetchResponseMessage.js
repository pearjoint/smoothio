(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  smio = global.smoothio;
  smio.FetchResponseMessage = (function() {
    __extends(FetchResponseMessage, smio.FetchMessageBase);
    function FetchResponseMessage() {
      this.errors = __bind(this.errors, this);
      this.controls = __bind(this.controls, this);
      FetchResponseMessage.__super__.constructor.apply(this, arguments);
    }
    FetchResponseMessage.prototype.controls = function(ctls) {
      if (ctls) {
        this.msg._f = ctls;
      }
      return this.msg._f;
    };
    FetchResponseMessage.prototype.errors = function() {
      var e, errs, _i, _len, _ref;
      errs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (errs) {
        if (!this.msg._e) {
          this.msg._e = [];
        }
        _ref = _.flatten(errs);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          this.msg._e.push(e);
        }
      }
      return this.msg._e;
    };
    return FetchResponseMessage;
  })();
}).call(this);
