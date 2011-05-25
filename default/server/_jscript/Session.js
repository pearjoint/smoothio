(function() {
  var smio, _;
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
      var fm, x;
      fm = {
        e: []
      };
      if (!fr) {
        fr = rc.postData;
      }
      if (_.isString(fr)) {
        try {
          fr = JSON.parse(fr);
        } catch (err) {
          fm.e.push(this.inst.formatError(err));
        }
      }
      if (fr && !_.isString(fr)) {
        x = "";
      }
      return finish(fm);
    };
    Session.prototype.onEnd = function() {};
    return Session;
  })();
}).call(this);
