(function() {
  var node_path, smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  node_path = require('path');
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
    }
    RequestContext.prototype.handleRequest = function() {
      var filePath, hasHandler;
      this.inst.lastRequestTime = new Date;
      if (hasHandler = this.uri.pathItems.length && this.uri.pathItems[0] === '_' && this.uri.pathItems.length > 2) {
        switch (this.uri.pathItems[1]) {
          case "file":
            if (node_path.existsSync(node_path.join(this.server.fileServer.root, filePath = this.uri.pathItems.slice(2).join('/')))) {
              this.server.fileServer.serveFile(filePath, 200, this.httpRequest.headers, this.httpRequest, this.httpResponse).addListener('error', __bind(function(err) {
                this.httpResponse.writeHead(500, {
                  'Content-Type': 'text/plain'
                });
                return this.httpResponse.end(JSON.stringify(err));
              }, this));
            } else {
              this.httpResponse.writeHead(404, {
                'Content-Type': 'text/plain'
              });
              this.httpResponse.end("404 File Not Found: " + (node_path.join(this.server.fileServer.root, filePath)));
            }
            break;
          default:
            hasHandler = false;
        }
      }
      if (!hasHandler) {
        return this.server.fileServer.serveFile('smoothio.html', 200, this.httpRequest.headers, this.httpRequest, this.httpResponse);
      }
    };
    return RequestContext;
  })();
}).call(this);
