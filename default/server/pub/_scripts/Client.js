(function() {
  var smio;
  smio = global.smoothio;
  smio.Client = (function() {
    function Client() {
      this.mainFrame = new smio.Packs_SmoothioCore_CommonControls_mainframe({
        id: 'sm'
      });
      this.sessionID = '';
      this.socket = new smio.Socket(this);
    }
    Client.prototype.init = function() {
      var $el;
      this.sessionID = $.cookie('smiosessid');
      $el = $('#smio_body');
      this.mainFrame.renderHtml($el);
      this.mainFrame.onLoad($el);
      this.socket.connect();
      return setInterval((function() {
        return $('#smio_body').css({
          "background-image": "url('/_/file/images/bg" + (smio.util.math.randomInt(4)) + ".jpg')"
        });
      }), 5000);
    };
    return Client;
  })();
  $(document).ready(function() {
    smio.util = new smio.Util;
    smio.client = new smio.Client();
    return smio.client.init();
  });
}).call(this);
