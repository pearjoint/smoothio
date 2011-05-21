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
}).call(this);
