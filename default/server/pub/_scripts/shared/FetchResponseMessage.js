(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
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
        this.msg.c = ctls;
      }
      return this.msg.c;
    };
    FetchResponseMessage.prototype.errors = function(errs) {
      var e, _i, _len;
      if (errs && errs.length) {
        if (!this.msg.e) {
          this.msg.e = [];
        }
        for (_i = 0, _len = errs.length; _i < _len; _i++) {
          e = errs[_i];
          this.msg.e.push(e);
        }
      }
      return this.msg.e;
    };
    return FetchResponseMessage;
  })();
}).call(this);
