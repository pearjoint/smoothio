(function() {
  var smio, _;
  require('./Site');
  require('./shared/FetchRequestMessage');
  require('./shared/FetchResponseMessage');
  require('./shared/Util');
  _ = require('underscore');
  smio = global.smoothio;
  smio.Session = (function() {
    Session.all = {};
    Session.getBySessionID = function(server, sessionID) {
      var sess;
      sess = null;
      if (sessionID) {
        if (!(sess = this.all[sessionID])) {
          this.all[sessionID] = sess = new smio.Session(server, sessionID, server.socket);
        }
      }
      return sess;
    };
    function Session(server, sessionID, socket) {
      this.server = server;
      this.sessionID = sessionID;
      this.socket = socket;
      this.inst = this.server.inst;
    }
    Session.prototype.handleFetch = function(rc, fr, finish) {
      var freq, fresp, isSocket, site;
      isSocket = rc === null;
      fresp = new smio.FetchResponseMessage();
      if (!fr) {
        fr = rc.postData;
      }
      if (_.isString(fr)) {
        try {
          fr = JSON.parse(fr);
        } catch (err) {
          fresp.errors(err);
        }
      }
      if (fr && !_.isString(fr)) {
        freq = new smio.FetchRequestMessage(fr);
        site = new smio.Site(this, freq.url(), rc);
        fresp.controls(site.getControlUpdates(freq.ticks()));
        if (!isSocket) {
          fresp.ticks(smio.Util.DateTime.utcTicks());
        }
      }
      return finish(fresp.msg);
    };
    Session.prototype.onEnd = function() {};
    Session.prototype.onInit = function() {};
    return Session;
  })();
}).call(this);
