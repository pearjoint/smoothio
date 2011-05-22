(function() {
  var node_path, node_uuid, smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  node_path = require('path');
  node_uuid = require('node-uuid');
  smio = global.smoothio;
  smio.RequestContext = (function() {
    function RequestContext(server, uri, httpRequest, httpResponse, adminDB, sharedDB, serverDB) {
      this.server = server;
      this.uri = uri;
      this.httpRequest = httpRequest;
      this.httpResponse = httpResponse;
      this.adminDB = adminDB;
      this.sharedDB = sharedDB;
      this.serverDB = serverDB;
      this.inst = this.server.inst;
      this.cookies = this.server.inst.util.inst.parseCookies(this.httpRequest.headers['cookie']);
    }
    RequestContext.prototype.handleRequest = function() {
      var filePath, hasHandler, k, respHeaders, v;
      this.inst.lastRequestTime = new Date;
      if (!this.cookies['smiosessid']) {
        this.cookies['smiosessid'] = node_uuid();
      }
      respHeaders = {
        'Set-Cookie': ((function() {
          var _ref, _results;
          _ref = this.cookies;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            _results.push(k + '=' + v);
          }
          return _results;
        }).call(this)).join(';')
      };
      if (hasHandler = this.uri.pathItems.length && this.uri.pathItems[0] === '_' && this.uri.pathItems.length > 2) {
        switch (this.uri.pathItems[1]) {
          case "file":
            if (node_path.existsSync(node_path.join(this.server.fileServer.root, filePath = this.uri.pathItems.slice(2).join('/')))) {
              this.server.fileServer.serveFile(filePath, 200, respHeaders, this.httpRequest, this.httpResponse).addListener('error', __bind(function(err) {
                respHeaders['Content-Type'] = 'text/plain';
                this.httpResponse.writeHead(err.status, this.server.inst.util.inst.mergeConfigWithDefaults(err.headers, respHeaders));
                return this.httpResponse.end(JSON.stringify(err));
              }, this));
            } else {
              respHeaders['Content-Type'] = 'text/plain';
              this.httpResponse.writeHead(404, respHeaders);
              this.httpResponse.end("404 File Not Found: " + (node_path.join(this.server.fileServer.root, filePath)));
            }
            break;
          default:
            hasHandler = false;
        }
      }
      if (!hasHandler) {
        return this.server.fileServer.serveFile('smoothio.html', 200, respHeaders, this.httpRequest, this.httpResponse);
      }
    };
    return RequestContext;
  })();
}).call(this);
