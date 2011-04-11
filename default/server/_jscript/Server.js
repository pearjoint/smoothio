(function() {
  var node_http, node_multi, node_os, node_static, node_url, node_util, smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require('./RequestContext');
  node_http = require('http');
  node_multi = require('multi-node');
  node_os = require('os');
  node_static = require('node-static');
  node_url = require('url');
  node_util = require('util');
  smio = global.smoothio;
  smio.Server = (function() {
    function Server(inst, serverName, hostName, port, processes) {
      var host, ip, localHostName, _ref;
      this.inst = inst;
      this.serverName = serverName;
      this.hostName = hostName;
      this.port = port;
      this.processes = processes;
      hostName = this.hostName;
      localHostName = node_os.hostname();
      if (process.platform === 'cygwin') {
        _ref = this.inst.config.cygwin.dns_preresolve;
        for (host in _ref) {
          ip = _ref[host];
          if ((hostName === host) || ((host === '$localhostname') && hostName === localHostName)) {
            hostName = ip;
            break;
          }
        }
      }
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
        return this.status = -1;
      }, this));
      if (this.processes <= 1) {
        this.httpServer.listen(this.port, hostName, __bind(function() {
          return this.onBind();
        }, this));
      } else {
        node_multi.listen({
          "port": this.port,
          "nodes": this.processes
        }, this.httpServer);
      }
    }
    Server.prototype.onBind = function() {
      this.status = 1;
      return smio.logit(this.inst.r('log_server_listening', this.serverName, this.hostName, this.port), 'servers.' + this.serverName);
    };
    Server.prototype.onError = function(err) {
      return smio.logit(this.inst.r('log_server_error_start', this.serverName, this.inst.formatError(err)), 'servers.' + this.serverName);
    };
    Server.prototype.onRequest = function(request, response) {
      var ctx, pathItem, uri, url;
      this.status = 1;
      url = request.url;
      if (url.indexOf('http://' !== 0 && url.indexOf('https://' !== 0))) {
        url = "" + (this.isHttps ? 'http' : 'https') + "://" + this.hostName + ":" + this.port + url;
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
        if (uri.pathItems[0].indexOf('favicon' === 0)) {
          uri.pathItems = ['_', 'file', uri.pathItems[0]];
        }
      }
      uri.rawUrl = request.url;
      uri.url = url;
      ctx = new smio.RequestContext(this, uri, request, response, this.inst.mongos['admin'], this.inst.mongos['smoothio_shared'], this.inst.mongos["smoothio__" + this.serverName]);
      return ctx.handleRequest();
    };
    Server.prototype.stop = function() {
      this.status = 0;
      try {
        return this.httpServer.close();
      } catch (err) {
        return this.status = -1;
      }
    };
    return Server;
  })();
}).call(this);
