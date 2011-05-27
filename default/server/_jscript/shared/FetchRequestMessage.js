(function() {
  var smio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
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
      FetchRequestMessage.__super__.constructor.apply(this, arguments);
    }
    FetchRequestMessage.prototype.url = function(url) {
      if (url != null) {
        this.msg.u = url;
      }
      return this.msg.u;
    };
    return FetchRequestMessage;
  })();
}).call(this);
