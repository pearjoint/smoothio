(function() {
  var smio;
  smio = global.smoothio;
  smio.SocketSession = (function() {
    SocketSession.all = {};
    SocketSession.getBySessionID = function(server, sessionID) {
      var sess;
      sess = null;
      if (sessionID) {
        if (!(sess = this.all[sessionID])) {
          this.all[sessionID] = sess = new smio.SocketSession(server, sessionID, server.socket);
        }
      }
      return sess;
    };
    SocketSession.getBySocketClient = function(inst, client) {
      var cookies, _ref, _ref2, _ref3;
      cookies = smio.Util.Server.parseCookies((_ref = client['listener']) != null ? (_ref2 = _ref['request']) != null ? (_ref3 = _ref2['headers']) != null ? _ref3['cookie'] : void 0 : void 0 : void 0);
      return smio.SocketSession.getBySessionID(cookies['smiosessid']);
    };
    function SocketSession(server, sessionID, socket) {
      this.server = server;
      this.sessionID = sessionID;
      this.socket = socket;
    }
    return SocketSession;
  })();
}).call(this);
