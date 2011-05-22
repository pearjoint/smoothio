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
      this.cookies = smio.Util.Server.parseCookies(this.httpRequest.headers['cookie']);
    }
    RequestContext.prototype.handleRequest = function() {
      var cfgKey, cfgVal, date, fname, hasHandler, k, respHeaders, v;
      this.inst.lastRequestTime = new Date;
      if (!this.cookies['smiosessid']) {
        date = new Date();
        date.setTime(date.getTime() + (this.server.inst.config.session.timeout * 60 * 1000));
        this.cookies['smiosessid'] = node_uuid();
      }
      respHeaders = {
        'Set-Cookie': (((function() {
          var _ref, _results;
          _ref = this.cookies;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            _results.push(k + '=' + v);
          }
          return _results;
        }).call(this)).join(';')) + ("; expires=" + (smio.Util.DateTime.addMinutes(smio.Util.Number.tryParseInt(this.inst.config.session.timeout, 20)).toGMTString()) + "; path=/")
      };
      if (hasHandler = this.uri.pathItems.length && this.uri.pathItems[0] === '_' && this.uri.pathItems.length > 2) {
        switch (this.uri.pathItems[1]) {
          case "dynfile":
            if ((cfgKey = this.uri.query['config']) && (cfgVal = this.server.inst.config[cfgKey]) && (fname = this.uri.query[cfgVal + ''])) {
              this.serveFile(fname, respHeaders);
            } else {
              respHeaders['Content-Type'] = 'text/plain';
              this.httpResponse.writeHead(404, respHeaders);
              this.httpResponse.end("404 File Not Found: " + (node_path.join(this.server.fileServer.root, filePath)));
            }
            break;
          case "file":
            this.serveFile(this.uri.pathItems.slice(2).join('/'), respHeaders);
            break;
          default:
            hasHandler = false;
        }
      }
      if (!hasHandler) {
        return this.serveFile('smoothio.html', respHeaders);
      }
    };
    RequestContext.prototype.serveFile = function(filePath, respHeaders) {
      if (node_path.existsSync(node_path.join(this.server.fileServer.root, filePath))) {
        return this.server.fileServer.serveFile(filePath, 200, respHeaders, this.httpRequest, this.httpResponse).addListener('error', __bind(function(err) {
          respHeaders['Content-Type'] = 'text/plain';
          this.httpResponse.writeHead(err.status, smio.Util.Server.mergeConfigWithDefaults(err.headers, respHeaders));
          return this.httpResponse.end(JSON.stringify(err));
        }, this));
      } else {
        respHeaders['Content-Type'] = 'text/plain';
        this.httpResponse.writeHead(404, respHeaders);
        return this.httpResponse.end("404 File Not Found: " + (node_path.join(this.server.fileServer.root, filePath)));
      }
    };
    return RequestContext;
  })();
}).call(this);
