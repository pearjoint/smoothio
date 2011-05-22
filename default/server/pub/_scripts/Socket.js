(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Socket = (function() {
    function Socket(client, host) {
      this.client = client;
      this.socket = new io.Socket(host, {
        resource: '/_/sockio/',
        rememberTransport: false,
        connectTimeout: 2000
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
      this.sessionID = '';
    }
    Socket.prototype.connect = function() {
      return this.socket.connect();
    };
    Socket.prototype.onSocketConnect = function() {
      return alert(JSON.stringify(this.socket.transport));
    };
    Socket.prototype.onSocketConnectFailed = function() {};
    Socket.prototype.onSocketConnecting = function(type) {};
    Socket.prototype.onSocketDisconnect = function() {
      return this.sessionID = '';
    };
    Socket.prototype.onSocketMessage = function(msg) {
      this.sessionID = this.socket.transport.sessionid;
      return alert(msg + '\n' + this.sessionID);
    };
    Socket.prototype.onSocketReconnect = function(type, attempts) {};
    Socket.prototype.onSocketReconnectFailed = function() {};
    Socket.prototype.onSocketReconnecting = function(delay, attempts) {};
    return Socket;
  })();
}).call(this);
