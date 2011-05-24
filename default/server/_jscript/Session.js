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
    SocketSession.getBySocketClient = function(server, client) {
      return smio.SocketSession.getBySessionID(server, client.sessionId);
    };
    function SocketSession(server, sessionID, socket) {
      this.server = server;
      this.sessionID = sessionID;
      this.socket = socket;
    }
    SocketSession.prototype.onEnd = function() {};
    SocketSession.prototype.onMessage = function(msg) {};
    return SocketSession;
  })();
}).call(this);
