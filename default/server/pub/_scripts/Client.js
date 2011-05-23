(function() {
  var smio;
  smio = global.smoothio;
  smio.Client = (function() {
    function Client() {
      this.socket = new smio.Socket(this);
    }
    Client.prototype.init = function() {
      var $el;
      $el = $('#smio_body');
      this.socket.connect();
      return setInterval((function() {
        return $('#smio_body').css({
          "background-image": "url('/_/file/images/bg" + (smio.Util.Number.randomInt(4)) + ".jpg')"
        });
      }), 5000);
    };
    return Client;
  })();
}).call(this);
