(function() {
  var node_fs, node_path, node_urlq, node_uuid, smio, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require('./shared/Control');
  require('./Session');
  _ = require('underscore');
  node_fs = require('fs');
  node_path = require('path');
  node_uuid = require('node-uuid');
  node_urlq = require('querystring');
  smio = global.smoothio;
  smio.RequestContext = (function() {
    RequestContext.parseSmioCookie = function(cookies, fail) {
      var parse, smioCookie;
      if (_.isString(cookies)) {
        cookies = smio.Util.Server.parseCookies(cookies);
      }
      parse = function() {
        return JSON.parse(node_urlq.unescape(cookies['smoo']));
      };
      if (fail) {
        smioCookie = parse();
      } else {
        try {
          smioCookie = parse();
        } catch (err) {
          smioCookie = {};
        }
      }
      return smioCookie;
    };
    function RequestContext(server, uri, httpRequest, httpResponse, adminDB, sharedDB, serverDB) {
      this.server = server;
      this.uri = uri;
      this.httpRequest = httpRequest;
      this.httpResponse = httpResponse;
      this.adminDB = adminDB;
      this.sharedDB = sharedDB;
      this.serverDB = serverDB;
      this.inst = this.server.inst;
      this.postData = null;
      this.smioCookie = smio.RequestContext.parseSmioCookie(this.cookies = smio.Util.Server.parseCookies(this.httpRequest.headers['cookie']));
      if (this.httpRequest.method === 'POST') {
        this.postData = '';
        this.httpRequest.on('end', __bind(function() {
          return this.handleRequest();
        }, this));
        this.httpRequest.on('data', __bind(function(data) {
          return this.postData += "" + data;
        }, this));
      } else {
        this.handleRequest();
      }
    }
    RequestContext.prototype.handleRequest = function() {
      var cfgKey, cfgVal, ctype, finish, fname, hasHandler, respHeaders, userlang;
      this.inst.lastRequestTime = new Date;
      if (!this.smioCookie['sessid']) {
        this.smioCookie['sessid'] = node_uuid();
      }
      respHeaders = {
        'Set-Cookie': "smoo=" + (node_urlq.escape(JSON.stringify(this.smioCookie))) + "; path=/"
      };
      try {
        if (hasHandler = this.uri.pathItems.length && this.uri.pathItems[0] === '_' && this.uri.pathItems.length >= 2) {
          switch (this.uri.pathItems[1]) {
            case "poll":
              respHeaders['Content-Type'] = 'text/plain';
              finish = __bind(function(data) {
                this.httpResponse.writeHead(200, respHeaders);
                return this.httpResponse.end(JSON.stringify(data));
              }, this);
              if (this.uri.pathItems[2] === 'f') {
                (smio.Session.getBySessionID(this.server, this.smioCookie['sessid'])).handleFetch(this, null, finish);
              } else {
                finish({});
              }
              break;
            case "dynfile":
              if ((cfgKey = this.uri.query['config'])) {
                if (cfgKey === '_res.js') {
                  respHeaders['Content-Type'] = 'text/javascript';
                  if (0 <= _.indexOf(smio.resLangs, (userlang = this.userLanguage()))) {
                    this.serveFile("_merged/_res." + userlang + ".js", respHeaders);
                  } else {
                    this.serveFile("_merged/_res.js", respHeaders);
                  }
                } else if ((cfgVal = '' + smio.Util.Object.select(this.server.inst.config, cfgKey)) && (fname = this.uri.query[cfgVal])) {
                  if ((ctype = this.uri.query['type'])) {
                    respHeaders['Content-Type'] = ctype;
                  }
                  this.serveFile(fname, respHeaders);
                }
              } else {
                respHeaders['Content-Type'] = 'text/plain';
                this.httpResponse.writeHead(404, respHeaders);
                this.httpResponse.end("404 File Not Found: " + (node_path.join(this.server.fileServer.root, fname)) + " (dynamic file)");
              }
              break;
            case "file":
              if (this.uri.pathItems.length > 2) {
                this.serveFile(this.uri.pathItems.slice(2).join('/'), respHeaders);
              } else {
                throw new Error("No file path specified");
              }
              break;
            default:
              throw new Error("Unknown URL handler: '" + this.uri.pathItems[1] + "'");
          }
        }
        if (!hasHandler) {
          return this.servePage(respHeaders);
        }
      } catch (err) {
        respHeaders['Content-Type'] = 'text/plain';
        this.httpResponse.writeHead(500, respHeaders);
        return this.httpResponse.end("500 Internal Server Error:\n" + (this.inst.formatError(err)));
      }
    };
    RequestContext.prototype.userLanguage = function() {
      var lq, pos, _i, _len, _ref;
      if (!this['userLangs']) {
        this.userLangs = [];
        _ref = ("" + this.httpRequest.headers['accept-language']).split(',');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          lq = _ref[_i];
          if (0 <= (pos = lq.indexOf(';'))) {
            lq = lq.substr(0, pos);
          }
          if (0 <= (pos = lq.indexOf('-'))) {
            lq = lq.substr(0, pos);
          }
          if (0 > _.indexOf(this.userLangs, lq)) {
            this.userLangs.push(lq);
          }
        }
      }
      return smio.iif(this.userLangs.length, this.userLangs[0], '');
    };
    RequestContext.prototype.serveFile = function(filePath, respHeaders) {
      return node_fs.stat(node_path.join(this.server.fileServer.root, filePath), __bind(function(err, stat) {
        if (stat && stat.isFile()) {
          return this.server.fileServer.serveFile(filePath, 200, respHeaders, this.httpRequest, this.httpResponse).addListener('error', __bind(function(err) {
            respHeaders['Content-Type'] = 'text/plain';
            this.httpResponse.writeHead(err.status, smio.Util.Object.mergeDefaults(err.headers, respHeaders));
            return this.httpResponse.end(JSON.stringify(err));
          }, this));
        } else {
          respHeaders['Content-Type'] = 'text/plain';
          this.httpResponse.writeHead(smio.iif(err, 500, 404), respHeaders);
          if (err && err['errno'] !== 2) {
            return this.httpResponse.end("500 Internal Server Error:\n" + (this.inst.formatError(err)));
          } else {
            return this.httpResponse.end("404 File Not Found: " + (node_path.join(this.server.fileServer.root, filePath)));
          }
        }
      }, this));
    };
    RequestContext.prototype.servePage = function(respHeaders) {
      var fileContent, placeholder, pos, session;
      placeholder = "___smiopagecontent___";
      respHeaders['Content-Type'] = 'text/html';
      this.httpResponse.writeHead(200, respHeaders);
      if (!smio.RequestContext.htmlContent) {
        smio.RequestContext.htmlContent = smio.Util.FileSystem.readTextFile("server/pub/smoothio.html");
      }
      fileContent = smio.RequestContext.htmlContent;
      pos = fileContent.indexOf(placeholder);
      if (pos <= 0) {
        return this.httpResponse.write(fileContent);
      } else {
        this.httpResponse.write(fileContent.substr(0, pos));
        return (session = smio.Session.getBySessionID(this.server, this.smioCookie['sessid'])).handleFetch(this, {}, __bind(function(data) {
          var ctl;
          ctl = smio.Control.load(data['c']['']['_'], null, {
            id: 'sm'
          });
          this.httpResponse.write(ctl.renderHtml());
          return this.httpResponse.end(fileContent.substr(pos + placeholder.length));
        }, this));
      }
    };
    return RequestContext;
  })();
}).call(this);
