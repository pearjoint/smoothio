(function() {
  var smio;
  smio = global.smoothio;
  smio.Client = (function() {
    function Client() {
      var cookie;
      this.socket = new smio.Socket(this, false);
      this.sleepy = false;
      $('#smio_offline').text(smio.resources.smoothio.offline);
      cookie = $.cookie('smoo');
      try {
        this.smioCookie = JSON.parse(cookie);
      } catch (err) {
        this.smioCookie = null;
      }
      if (!this.smioCookie) {
        this.smioCookie = {};
      }
      this.sessionID = this.smioCookie['sessid'];
    }
    Client.prototype.init = function() {
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
