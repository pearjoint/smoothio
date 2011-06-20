(function() {
  var smio, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require('./Hub');
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
      this.onInit = __bind(this.onInit, this);
      this.onEnd = __bind(this.onEnd, this);
      this.handleFetch = __bind(this.handleFetch, this);
    }
    Session.prototype.handleFetch = function(rc, fr, finish) {
      var freq, fresp, hub, isSocket;
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
        hub = new smio.Hub(this, freq.url(), rc);
        if (freq.settings()) {
          fresp.settings({
            i_h: 4500,
            i_f: 16000
          });
        }
        return hub.getControlUpdates(freq.ticks(), freq, fresp, function(err, ctl) {
          if (err) {
            fresp.errors(err);
          }
          if (ctl) {
            fresp.controls(ctl);
          }
          if (!isSocket) {
            fresp.ticks(smio.Util.DateTime.utcTicks());
          }
          return finish(fresp.msg);
        });
      }
    };
    Session.prototype.onEnd = function() {};
    Session.prototype.onInit = function() {};
    return Session;
  })();
}).call(this);
