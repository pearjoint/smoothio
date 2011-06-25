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
  require('./FetchMessageBase');
  smio = global.smoothio;
  smio.FetchRequestMessage = (function() {
    __extends(FetchRequestMessage, smio.FetchMessageBase);
    function FetchRequestMessage() {
      this.url = __bind(this.url, this);
      FetchRequestMessage.__super__.constructor.apply(this, arguments);
    }
    FetchRequestMessage.prototype.url = function(url) {
      if (url != null) {
        this.msg._u = url;
      }
      return this.msg._u;
    };
    return FetchRequestMessage;
  })();
}).call(this);
