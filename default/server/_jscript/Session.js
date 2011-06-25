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
      this.handleInvoke = __bind(this.handleInvoke, this);
    }
    Session.prototype.handleInvoke = function(rc, fr, finish) {
      var cmdName, freq, fresp, hub, isSocket, prefix, tmp, _ref;
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
        try {
          freq = new smio.FetchRequestMessage(fr);
          hub = new smio.Hub(this, freq.url(), rc);
          switch ((tmp = freq.cmd())) {
            case 'f':
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
            case 's':
              fresp.settings({
                fi: 15000,
                bg: '/_/file/images/bg0.jpg'
              });
              return finish(fresp.msg);
            default:
              fresp.ctlID(freq.ctlID());
              _ref = tmp.split('.'), prefix = _ref[0], cmdName = _ref[1];
              if (prefix === 'Hub') {
                return hub.invoke(cmdName, freq, fresp, function(err, res) {
                  if (err) {
                    fresp.errors(err);
                  }
                  if (res) {
                    fresp.msg[tmp] = res;
                  }
                  return finish(fresp.msg);
                });
              } else {
                return smio.logit("WOOT");
              }
          }
        } catch (err) {
          fresp.errors(err);
          return finish(fresp.msg);
        }
      }
    };
    Session.prototype.onEnd = function() {};
    Session.prototype.onInit = function() {};
    return Session;
  })();
}).call(this);
