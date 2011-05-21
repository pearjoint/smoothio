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
    smio.init();
    return $('#smio_body').html((new smio.Packs_SmoothioCore_CommonControls_mainframe({
      id: 'sm'
    })).renderHtml());
  });
}).call(this);
