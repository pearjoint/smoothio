(function() {
  var mongodb, node_fs, node_os, node_path, node_proc, node_util, smio, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  _ = require('underscore');
  _.mixin(require('underscore.string'));
  mongodb = require('mongodb');
  node_fs = require('fs');
  node_os = require('os');
  node_path = require('path');
  node_proc = require('child_process');
  node_util = require('util');
  require('./shared/Util');
  require('./Database');
  require('./Packs');
  require('./Server');
  smio = global.smoothio;
  smio.Instance = (function() {
    function Instance() {
      var resErrs;
      this.logFile = null;
      this.util = new smio.Util;
      this.initTime = new Date;
      this.lastRequestTime = null;
      this.restartMinUptime = 60;
      this.resourceSets = {};
      this.servers = [];
      this.mongos = {};
      if ((resErrs = this.loadResourceSets('../_core/res', false)) && resErrs.length) {
        throw resErrs[0];
      }
    }
    Instance.prototype.expandLogPath = function(path) {
      var dt, pos;
      if (path && ((pos = path.indexOf('*')) > 0)) {
        dt = new Date;
        path = "" + (path.substr(0, pos)) + (this.util.formatDate(dt)) + (path.substr(pos + 1));
      }
      return path;
    };
    Instance.prototype.finalizeStart = function() {
      var lastInterval, scfg, server, sname, _ref, _results;
      lastInterval = 0;
      this.mongo = new mongodb.Server(this.mongoConfig.host, this.mongoConfig.port, {
        "autoReconnect": true,
        "auto_reconnect": true
      });
      this.mongos['admin'] = new smio.Database(this, this.mongo, 'admin', 'MongoDB Admin', null, lastInterval += 500);
      this.mongos['smoothio_shared'] = new smio.Database(this, this.mongo, 'smoothio_shared', 'smoothio Shared', null, lastInterval += 500);
      _ref = this.config.servers;
      _results = [];
      for (sname in _ref) {
        scfg = _ref[sname];
        _results.push((sname != null) && (scfg != null) && (scfg['host'] != null) && (scfg['port'] != null) && (!(scfg['disabled'] === true)) ? (server = new smio.Server(this, sname, scfg.host, scfg.port, 1), this.servers.push(server), this.mongos["smoothio__" + sname] = new smio.Database(this, this.mongo, "smoothio__" + sname, "smoothio " + sname, server, lastInterval += 500)) : void 0);
      }
      return _results;
    };
    Instance.prototype.formatError = function(err) {
      return this.util.inst.formatError(err, this.config.smoothio.logging.details, this.config.smoothio.logging.stack);
    };
    Instance.prototype.getUptime = function() {
      return ((new Date).getTime() / 1000) - (this.initTime.getTime() / 1000);
    };
    Instance.prototype.haveAllStopped = function() {
      var server, _i, _len, _ref;
      _ref = this.servers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        server = _ref[_i];
        if (server.status !== -1) {
          false;
        }
      }
      if (this.mongoIsLocal && this.mongos['admin']) {
        return this.mongoHasShutDown;
      } else {
        return true;
      }
    };
    Instance.prototype.loadResourceSets = function(dirPath, recurse) {
      var errs;
      errs = [];
      smio.walkDir(dirPath, null, __bind(function(fpath, fname) {
        var generic, lpos, name, pos, resBaseName, resLang, resSet, specific, val, _ref, _results;
        if (_.isEndsWith(fname, '.res')) {
          resBaseName = fname.substr(0, pos = fname.indexOf('.'));
          if ('en' === (resLang = pos === (lpos = fname.lastIndexOf('.')) ? '' : fname.substr(pos + 1, lpos - pos - 1))) {
            resLang = '';
          }
          if (!(this.resourceSets[resBaseName] != null)) {
            generic = {};
            specific = resLang ? {} : generic;
            this.resourceSets[resBaseName] = {
              'en': generic
            };
            if (specific !== generic) {
              this.resourceSets[resBaseName][resLang] = specific;
            }
          }
          if (resLang && !this.resourceSets[resBaseName][resLang]) {
            this.resourceSets[resBaseName][resLang] = {};
          }
          try {
            _ref = resSet = JSON.parse(this.util.fs.readTextFile(fpath));
            _results = [];
            for (name in _ref) {
              val = _ref[name];
              _results.push(this.resourceSets[resBaseName][resLang ? resLang : 'en'][name] = val);
            }
            return _results;
          } catch (err) {
            err['ml_error_filepath'] = fpath;
            errs.push(err);
            return smio.logit("ERROR parsing resource file:\n" + (this.formatError(err)));
          }
        }
      }, this), null, !recurse);
      return errs;
    };
    Instance.prototype.r = function() {
      var args, resName;
      resName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.res.apply(this, ['', resName, ''].concat(__slice.call(args)));
    };
    Instance.prototype.res = function() {
      var args, lang, resName, resSet, val;
      resSet = arguments[0], resName = arguments[1], lang = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
      val = '';
      if (!resSet) {
        resSet = 'smoothio';
      }
      if ((!lang) && !(lang = this.config.smoothio.language)) {
        lang = 'en';
      }
      if (this.resourceSets[resSet] != null) {
        if (!(this.resourceSets[resSet][lang] != null)) {
          lang = 'en';
        }
        val = this.resourceSets[resSet][lang][resName] + '';
      }
      if (args && args.length) {
        val = this.util.string.replace(val, this.util.array.toObject(args, function(_, i) {
          return '{' + i + '}';
        }));
      }
      if ((!val) && lang !== 'en') {
        val = this.res.apply(this, [resSet, resName, 'en'].concat(__slice.call(args)));
      }
      return val;
    };
    Instance.prototype.start = function() {
      var closeLog, defHost, logPath, mongoLogPath, oldLogFunc;
      defHost = '127.0.0.1';
      try {
        this.config = this.util.inst.mergeConfigWithDefaults(JSON.parse(this.util.fs.readTextFile('instance.config')), {
          "smoothio": {
            "enabled": true,
            "processes": 1,
            "autorestart": {
              "on_files_changed": false,
              "on_crash_after_uptime_secs": this.restartMinUptime
            },
            "logging": {
              "details": false,
              "stack": false,
              "path": "server/log/smoothio.log"
            },
            "language": "en",
            "minify": true,
            "dns_preresolve": {
              "enabled": process.platform === 'cygwin',
              "hostnames": {
                "localhost": defHost,
                "$localhostname": defHost
              }
            }
          },
          "mongodb": {
            "host": defHost,
            "port": 61234,
            "dbpath": "server/dbs/",
            "logpath": "server/log/mongodb/mongodb.log"
          }
        });
      } catch (err) {
        err.ml_error_filepath = 'instance.config';
        err.message = 'ERROR parsing instance.config: ' + err.message;
        throw err;
      }
      if ((logPath = this.expandLogPath(this.config.smoothio.logging.path))) {
        try {
          node_fs.unlinkSync(logPath);
        } catch (_e) {}
        oldLogFunc = smio.logit;
        closeLog = __bind(function() {
          try {
            this.logFile.end();
          } catch (_e) {}
          try {
            this.logFile.destroySoon();
          } catch (_e) {}
          return this.logFile = null;
        }, this);
        smio.logit = __bind(function(line, cat) {
          var full;
          full = '';
          if (smio['logBuffer']) {
            full = smio.logBuffer.join('\n') + '\n';
            delete smio.logBuffer;
          }
          if (this.logFile && !this.logFile.writable) {
            closeLog;
          }
          if (!this.logFile) {
            this.logFile = node_fs.createWriteStream(logPath, {
              encoding: 'utf-8',
              mode: 0666
            });
            this.logFile.on('close', closeLog);
            this.logFile.on('error', closeLog);
          }
          full += (line = JSON.stringify(new Date()) + ' - ' + oldLogFunc(line, cat) + '\n');
          try {
            return this.logFile.write(full);
          } catch (_e) {}
        }, this);
      }
      if (!this.config.smoothio.enabled) {
        smio.logit("This smoothio instance has been disabled in instance.config.");
        return 0;
      }
      this.packs = new smio.Packs(this);
      if ((!(this.packs['corePack'] != null)) || (!this.packs.corePack.loaded)) {
        smio.logit(this.r('log_pack_nocorepack', 'SmoothioCore'));
        return 1;
      }
      this.mongoConfig = this.config.mongodb;
      this.autoRestart = this.config.smoothio.autorestart.on_files_changed === true && this.config.smoothio.processes === 1 ? true : false;
      this.restartMinUptime = this.config.smoothio.autorestart.on_crash_after_uptime_secs;
      if (this.mongoIsLocal = (process.platform !== 'cygwin') && this.mongoConfig.host === defHost) {
        mongoLogPath = this.expandLogPath(this.mongoConfig.logpath);
        try {
          node_fs.unlinkSync(node_path.join(this.mongoConfig.dbpath, "mongod.lock"));
        } catch (_e) {}
        node_proc.exec(("../_core/bin/" + (process.platform === 'darwin' ? 'osx' : 'linux') + "/mongod --fork --rest --dbpath " + this.mongoConfig.dbpath + " --port " + this.mongoConfig.port + " ") + (mongoLogPath ? "--logpath " + mongoLogPath : ''), __bind(function(err, stdout, stderr) {
          if (err) {
            smio.logit(this.r('log_mongo_error_start', this.formatError(err)), 'mongodb');
            return 1;
          } else {
            smio.logit(stdout.trim(), 'mongodb');
            return this.finalizeStart();
          }
        }, this));
      } else {
        this.finalizeStart();
      }
      return -1;
    };
    Instance.prototype.stop = function() {
      var server, _i, _len, _ref, _results;
      if (this.mongoIsLocal && this.mongos['admin']) {
        this.mongos['admin'].connect(__bind(function(err, db) {
          if (err != null) {
            smio.logit(JSON.stringify(err), 'mongodb');
            this.mongoHasShutDown = true;
          }
          if (db != null) {
            db.executeDbCommand({
              "shutdown": 1
            }, __bind(function(err, result) {
              this.mongoHasShutDown = true;
              return smio.logit(JSON.stringify(err != null ? err : result), 'mongodb');
            }, this));
            return this.mongoHasShutDown = true;
          }
        }, this));
      } else {
        this.mongoHasShutDown = true;
      }
      _ref = this.servers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        server = _ref[_i];
        _results.push(server.stop());
      }
      return _results;
    };
    return Instance;
  })();
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
