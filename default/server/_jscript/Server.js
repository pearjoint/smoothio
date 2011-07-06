(function() {
  var node_http, node_multi, node_os, node_static, node_url, node_util, smio, socketio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require('./RequestContext');
  require('./Session');
  node_http = require('http');
  node_multi = require('multi-node');
  node_os = require('os');
  node_static = require('node-static');
  node_url = require('url');
  node_util = require('util');
  socketio = require('socket.io');
  smio = global.smoothio;
  smio.Server = (function() {
    Server.sockSessions = {};
    Server.prototype.tryrequire = function(name) {
      try {
        return require(name);
      } catch (_e) {}
    };
    function Server(inst, serverName, hostName, port, processes) {
      var host, ip, localHostName, sockLogPath, sockLogger, _ref;
      this.inst = inst;
      this.serverName = serverName;
      this.hostName = hostName;
      this.port = port;
      this.processes = processes;
      this.stop = __bind(this.stop, this);
      this.onSocketMessage = __bind(this.onSocketMessage, this);
      this.onSocketDisconnect = __bind(this.onSocketDisconnect, this);
      this.onSocketConnect = __bind(this.onSocketConnect, this);
      this.onRequest = __bind(this.onRequest, this);
      this.onError = __bind(this.onError, this);
      this.onBind = __bind(this.onBind, this);
      this.getSocketSessionID = __bind(this.getSocketSessionID, this);
      hostName = this.hostName;
      localHostName = node_os.hostname();
      if (this.inst.config.smoothio.dns_preresolve.enabled || (process.platform === 'cygwin')) {
        _ref = this.inst.config.smoothio.dns_preresolve.hostnames;
        for (host in _ref) {
          ip = _ref[host];
          if ((hostName === host) || ((host === '$localhostname') && hostName === localHostName)) {
            hostName = ip;
            break;
          }
        }
      }
      this.sockLogFile = null;
      this.status = 0;
      this.isHttps = false;
      this.httpServer = node_http.createServer(__bind(function(request, response) {
        return this.onRequest(request, response);
      }, this));
      this.fileServer = new node_static.Server('server/pub/');
      this.httpServer.on('error', __bind(function(err) {
        return this.onError(err);
      }, this));
      this.httpServer.on('close', __bind(function() {
        smio.logit(this.inst.r('log_server_closed'), 'servers.' + this.serverName);
        return this.status = -1;
      }, this));
      if (this.processes <= 1) {
        this.httpServer.listen(this.port, hostName, __bind(function() {
          return this.onBind();
        }, this));
      } else {
        node_multi.listen({
          port: this.port,
          nodes: this.processes
        }, this.httpServer);
      }
      this.sockLogFile = null;
      if (sockLogPath = this.inst.expandLogPath(this.inst.config.sockets.logpath)) {
        sockLogger = smio.Util.Server.setupLogFile(this, 'sockLogFile', false, sockLogPath, function(msg) {
          return msg;
        });
      } else {
        sockLogger = function() {};
      }
      if ((this.io = socketio.listen(this.httpServer, {
        transports: ['websocket'],
        'flash policy server': false,
        'browser client': false
      }))) {
        this.io.configure('', __bind(function() {
          this.io.set('transports', ['websocket']);
          this.io.set('logger', {});
          this.io.disable('flash policy server');
          return this.io.disable('browser client');
        }, this));
        this.io.sockets.on('connection', __bind(function(socket) {
          socket.on('disconnect', __bind(function(sock) {
            return this.onSocketDisconnect(sock || socket);
          }, this));
          socket.on('message', __bind(function(msg, sock) {
            return this.onSocketMessage(msg, sock || socket);
          }, this));
          return this.onSocketConnect(socket);
        }, this));
      }
    }
    Server.prototype.getSocketSessionID = function(socket) {
      var _ref, _ref2;
      if (!smio.Server.sockSessions[socket.id]) {
        smio.Server.sockSessions[socket.id] = smio.RequestContext.parseSmioCookie((_ref = socket['handshake']) != null ? (_ref2 = _ref['headers']) != null ? _ref2['cookie'] : void 0 : void 0).sessid;
      }
      return smio.Server.sockSessions[socket.id];
    };
    Server.prototype.onBind = function() {
      this.status = 1;
      return smio.logit(this.inst.r('log_server_listening', this.serverName, this.hostName, this.port), 'servers.' + this.serverName);
    };
    Server.prototype.onError = function(err) {
      return smio.logit(this.inst.r('log_server_error_start', this.serverName, this.inst.formatError(err)), 'servers.' + this.serverName);
    };
    Server.prototype.onRequest = function(request, response) {
      var ctx, pathItem, uri, url;
      if (this.status < 0) {
        response.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        response.end(JSON.stringify({
          __foo: 'Shutdown'
        }));
        return this.stop();
      } else {
        this.status = 1;
        url = request.url;
        if ((url.indexOf('http://') !== 0) && (url.indexOf('https://') !== 0)) {
          url = "" + (this.isHttps ? 'https' : 'http') + "://" + this.hostName + ":" + this.port + url;
        }
        uri = node_url.parse(url, true);
        uri.pathItems = (function() {
          var _i, _len, _ref, _results;
          _ref = uri.pathname.split('/');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pathItem = _ref[_i];
            if (pathItem && pathItem.length) {
              _results.push(pathItem);
            }
          }
          return _results;
        })();
        if (uri.pathItems.length === 1) {
          if (uri.pathItems[0] === 'robots.txt') {
            uri.pathItems = ['_', 'file', 'robots.txt'];
          }
          if ((uri.pathItems[0].indexOf('favicon')) === 0) {
            uri.pathItems = ['_', 'file', uri.pathItems[0]];
          }
        }
        uri.rawUrl = request.url;
        uri.url = url;
        return ctx = new smio.RequestContext(this, uri, request, response, this.inst.mongos['admin'], this.inst.mongos['smoothio_shared'], this.inst.mongos["smoothio__" + this.serverName]);
      }
    };
    Server.prototype.onSocketConnect = function(socket) {
      var sess, sessid;
      if ((sessid = this.getSocketSessionID(socket)) && (sess = smio.Session.getBySessionID(this, sessid))) {
        sess.onInit();
        return socket.send(socket.id);
      } else {
        return socket.send("smoonocookie");
      }
    };
    Server.prototype.onSocketDisconnect = function(socket) {
      var sess, sessid;
      if ((sessid = this.getSocketSessionID(socket)) && (sess = smio.Session.all[sessid])) {
        sess.onEnd();
        smio.Session.all[sessid] = null;
        delete smio.Session.all[sessid];
      }
      if (smio.Server.sockSessions[socket.id]) {
        smio.Server.sockSessions[socket.id] = null;
        return delete smio.Server.sockSessions[socket.id];
      }
    };
    Server.prototype.onSocketMessage = function(message, socket) {
      var sess, sessid;
      if (message) {
        if ((sessid = this.getSocketSessionID(socket)) && (sess = smio.Session.getBySessionID(this, sessid))) {
          return sess.handleInvoke(null, message, function(data) {
            return socket.send(JSON.stringify(data));
          });
        } else {
          return socket.send("smoonocookie");
        }
      }
    };
    Server.prototype.stop = function() {
      this.status = -2;
      try {
        smio.logit(this.inst.r('log_server_closing'), 'servers.' + this.serverName);
        return this.httpServer.close();
      } catch (err) {
        this.onError(err);
        return this.status = -1;
      }
    };
    return Server;
  })();
}).call(this);
