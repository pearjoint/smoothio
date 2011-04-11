(function() {
  var smio;
  smio = global.smoothio;
  smio.util = new smio.Util;
  setInterval((function() {
    return jQuery('#smio_body').css({
      "background-image": "url('/_/file/images/bg" + (smio.util.randomInt(4)) + ".jpg')"
    });
  }), 5000);
}).call(this);
