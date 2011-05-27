(function() {
  var node_url, smio;
  node_url = require('url');
  smio = global.smoothio;
  smio.Site = (function() {
    function Site(session, url, rc) {
      this.session = session;
      this.url = url;
      this.rc = rc;
      this.server = this.session.server;
      this.inst = this.server.inst;
      if (!this.url) {
        this.url = '/';
      }
      this.uri = node_url.parse(this.url);
    }
    Site.prototype.getControlUpdates = function(sinceTicks) {
      return {
        "": {
          "_": "SmoothioCore_CommonControls_mainframe"
        }
      };
    };
    return Site;
  })();
}).call(this);
