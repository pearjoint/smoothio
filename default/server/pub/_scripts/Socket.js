(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Socket = (function() {
    function Socket(client, host) {
      this.client = client;
      this.sessionID = '';
      this.socket = new io.Socket(host, {
        resource: '/_/sockio/',
        rememberTransport: false,
        connectTimeout: 5000
      });
      this.socket.on('connect', __bind(function() {
        return this.onSocketConnect();
      }, this));
      this.socket.on('connect_failed', __bind(function() {
        return this.onSocketConnectFailed();
      }, this));
      this.socket.on('connecting', __bind(function(type) {
        return this.onSocketConnecting(type);
      }, this));
      this.socket.on('close', __bind(function() {
        return this.onSocketClose();
      }, this));
      this.socket.on('disconnect', __bind(function() {
        return this.onSocketDisonnect();
      }, this));
      this.socket.on('message', __bind(function(msg) {
        return this.onSocketMessage(msg);
      }, this));
      this.socket.on('reconnect', __bind(function(type, attempts) {
        return this.onSocketReconnect(type, attempts);
      }, this));
      this.socket.on('reconnect_failed', __bind(function() {
        return this.onSocketReconnectFailed();
      }, this));
      this.socket.on('reconnecting', __bind(function(delay, attempts) {
        return this.onSocketReconnecting(delay, attempts);
      }, this));
    }
    Socket.prototype.connect = function() {
      return this.socket.connect();
    };
    Socket.prototype.onSocketClose = function() {
      return $('#smio_log').append("<div>Closed</div>");
    };
    Socket.prototype.onSocketConnect = function() {
      $('#smio_log').append("<div>Connected</div>");
      if ((!this.sessionID) && this.socket.transport['sessionid']) {
        return this.sessionID = this.socket.transport.sessionid;
      }
    };
    Socket.prototype.onSocketConnectFailed = function() {
      $('#smio_log').append("<div>Connect failed</div>");
      return this.sessionID = '';
    };
    Socket.prototype.onSocketConnecting = function(type) {
      $('#smio_log').append("<div>Connecting [" + type + "]</div>");
      return this.sessionID = '';
    };
    Socket.prototype.onSocketDisconnect = function() {
      $('#smio_log').append("<div>Disconnected</div>");
      return this.sessionID = '';
    };
    Socket.prototype.onSocketMessage = function(msg) {
      $('#smio_log').append("<div>Message: " + msg + "</div>");
      if ((!this.sessionID) && this.socket.transport['sessionid']) {
        return this.sessionID = this.socket.transport.sessionid;
      }
    };
    Socket.prototype.onSocketReconnect = function(type, attempts) {
      $('#smio_log').append("<div>Reconnected: " + type + " after " + attempts + " attempts</div>");
      if ((!this.sessionID) && this.socket.transport['sessionid']) {
        return this.sessionID = this.socket.transport.sessionid;
      }
    };
    Socket.prototype.onSocketReconnectFailed = function() {
      $('#smio_log').append("<div>Reconnect failed</div>");
      return this.sessionID = '';
    };
    Socket.prototype.onSocketReconnecting = function(delay, attempts) {
      $('#smio_log').append("<div>Reconnecting in " + delay + " ms, " + attempts + " attempts</div>");
      return this.sessionID = '';
    };
    return Socket;
  })();
}).call(this);
