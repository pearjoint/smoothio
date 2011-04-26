(function() {
  var smio;
  smio = global.smoothio;
  smio.init = function() {
    smio.util = new smio.Util;
    return setInterval((function() {
      return $('#smio_body').css({
        "background-image": "url('/_/file/images/bg" + (smio.util.randomInt(4)) + ".jpg')"
      });
    }), 5000);
  };
}).call(this);
