(function() {
  var smio;
  smio = global.smoothio;
  smio.init = function() {
    smio.util = new smio.Util;
    return setInterval((function() {
      return $('#smio_body').css({
        "background-image": "url('/_/file/images/bg" + (smio.util.math.randomInt(4)) + ".jpg')"
      });
    }), 5000);
  };
  $(document).ready(function() {
    return smio.init();
  });
}).call(this);
