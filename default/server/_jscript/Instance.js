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
      this.stop = __bind(this.stop, this);
      this.start = __bind(this.start, this);
      this.res = __bind(this.res, this);
      this.r = __bind(this.r, this);
      this.loadResourceSets = __bind(this.loadResourceSets, this);
      this.haveAllStopped = __bind(this.haveAllStopped, this);
      this.getUptime = __bind(this.getUptime, this);
      this.getDbServer = __bind(this.getDbServer, this);
      this.getDb = __bind(this.getDb, this);
      this.jsonError = __bind(this.jsonError, this);
      this.formatError = __bind(this.formatError, this);
      this.finalizeStart = __bind(this.finalizeStart, this);      var resErrs;
      this.logFile = null;
      this.initTime = new Date();
      this.lastRequestTime = null;
      this.restartMinUptime = 60;
      this.resourceSets = {};
      this.servers = [];
      this.mongoHasShutDown = false;
      this.mongos = {};
      if ((resErrs = this.loadResourceSets('../_core/res/server', false)) && resErrs.length) {
        throw resErrs[0];
      }
    }
    Instance.prototype.expandLogPath = function(path) {
      var dt, pos;
      if (path && ((pos = path.indexOf('*')) > 0)) {
        dt = new Date();
        path = "" + (path.substr(0, pos)) + (smio.Util.DateTime.toString(dt)) + (path.substr(pos + 1));
      }
      return path;
    };
    Instance.prototype.finalizeStart = function() {
      var lastInterval, scfg, server, sname, _ref, _results;
      lastInterval = 0;
      this.mongo = this.getDbServer();
      this.mongos['admin'] = this.getDb(this.mongo, 'admin', 'MongoDB Admin', lastInterval += 500);
      this.mongos['smoothio_shared'] = this.getDb(this.mongo, 'smoothio_shared', 'smoothio Shared', lastInterval += 500);
      _ref = this.config.servers;
      _results = [];
      for (sname in _ref) {
        scfg = _ref[sname];
        _results.push((sname != null) && (scfg != null) && (scfg['host'] != null) && (scfg['port'] != null) && !(scfg['disabled'] === true) ? (server = new smio.Server(this, sname, scfg.host, scfg.port, 1), this.servers.push(server), this.mongos["smoothio__" + sname] = this.getDb(this.mongo, "smoothio__" + sname, "smoothio " + sname, lastInterval += 500)) : void 0);
      }
      return _results;
    };
    Instance.prototype.formatError = function(err) {
      return smio.Util.Server.formatError(err, this.config.smoothio.logging.details, this.config.smoothio.logging.stack);
    };
    Instance.prototype.jsonError = function(err) {
      var d, s, _ref;
      _ref = [this.config.smoothio.logging.details, this.config.smoothio.logging.stack], d = _ref[0], s = _ref[1];
      if (!d) {
        if (s && err.stack) {
          return err.stack;
        } else {
          return err.message;
        }
      } else {
        if (s) {
          return err;
        } else {
          return smio.Util.Object.cloneFiltered(err, function(k) {
            return k !== 'stack';
          });
        }
      }
    };
    Instance.prototype.getDb = function(dbServer, name, title, interval) {
      return new smio.Database(this, dbServer, name, (title ? title : name), interval);
    };
    Instance.prototype.getDbServer = function() {
      return new mongodb.Server(this.mongoConfig.host, this.mongoConfig.port, {
        autoReconnect: true,
        auto_reconnect: true
      });
    };
    Instance.prototype.getUptime = function() {
      return (new Date().getTime() / 1000) - (this.initTime.getTime() / 1000);
    };
    Instance.prototype.haveAllStopped = function() {
      var server, _i, _len, _ref;
      _ref = this.servers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        server = _ref[_i];
        if (server.status !== -1) {
          server.stop();
          return false;
        }
      }
      if (this.mongoIsLocal && this.mongos['admin']) {
        return this.mongoHasShutDown;
      } else {
        return true;
      }
    };
    Instance.prototype.loadResourceSets = function(dirPath, recurse, getBaseName) {
      var errs;
      errs = [];
      if (!_.isFunction(getBaseName)) {
        getBaseName = function(fpath, fname, relpath) {
          return fname;
        };
      }
      smio.walkDir(dirPath, null, __bind(function(fpath, fname, relpath) {
        var generic, lpos, name, pos, resBaseName, resLang, resSet, specific, val, _ref, _results;
        if (_.endsWith(fname, '.res')) {
          resBaseName = getBaseName(fpath, fname.substr(0, pos = fname.indexOf('.')), relpath);
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
            _ref = (resSet = JSON.parse(smio.Util.FileSystem.readTextFile(fpath)));
            _results = [];
            for (name in _ref) {
              val = _ref[name];
              _results.push((name !== 'x') && (name !== '___resource_file_intro') ? this.resourceSets[resBaseName][resLang ? resLang : 'en'][name] = val : void 0);
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
        val = smio.Util.String.replace(val, smio.Util.Array.toObject(args, (function(_, i) {
          return '{' + i + '}';
        })));
      }
      if ((!val) && (lang !== 'en')) {
        val = this.res.apply(this, [resSet, resName, 'en'].concat(__slice.call(args)));
      }
      return val;
    };
    Instance.prototype.start = function() {
      var defHost, logPath, mongoLogPath;
      defHost = '127.0.0.1';
      try {
        this.config = smio.Util.Object.mergeDefaults(JSON.parse(smio.Util.FileSystem.readTextFile('instance.config')), {
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
          "session": {
            "timeout": 20
          },
          "sockets": {
            "xdomain_swf": false,
            "logpath": "server/log/sockets.log"
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
        smio.logit = smio.Util.Server.setupLogFile(this, 'logFile', true, logPath, smio.logit);
      }
      if (!this.config.smoothio.enabled) {
        smio.logit("This smoothio instance has been disabled in instance.config.");
        return 0;
      }
      this.packs = new smio.Packs(this);
      if ((!(this.packs['corePack'] != null)) || (!this.packs.corePack.loaded)) {
        smio.logit(this.r('log_pack_nocorepack', 'Core'));
        return 1;
      }
      this.mongoConfig = this.config.mongodb;
      this.autoRestart = this.config.smoothio.autorestart.on_files_changed && (this.config.smoothio.processes === 1);
      this.restartMinUptime = this.config.smoothio.autorestart.on_crash_after_uptime_secs;
      if ((this.mongoIsLocal = (process.platform !== 'cygwin') && (this.mongoConfig.host === defHost))) {
        mongoLogPath = this.expandLogPath(this.mongoConfig.logpath);
        try {
          node_fs.unlinkSync(node_path.join(this.mongoConfig.dbpath, "mongod.lock"));
        } catch (_e) {}
        node_proc.exec(("../_core/bin/" + (process.platform === 'darwin' ? 'osx' : 'linux') + "/mongod --fork --rest --dbpath " + this.mongoConfig.dbpath + " --port " + this.mongoConfig.port + " ") + (mongoLogPath ? "--logpath " + mongoLogPath : ''), __bind(function(err, stdout, stderr) {
          if (err) {
            smio.logit(this.r('log_mongo_error_start', this.formatError(err)), 'mongodb');
            return 1;
          } else {
            smio.logit(_.trim(stdout), 'mongodb');
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
      if (this.mongoIsLocal && this.mongos['admin'] && !this.mongoHasShutDown) {
        this.mongos['admin'].connect(__bind(function(err, db) {
          if (err != null) {
            smio.logit(JSON.stringify(err), 'mongodb');
          }
          if (db != null) {
            return db.executeDbCommand({
              "shutdown": 1
            }, function(err, result) {
              return smio.logit(JSON.stringify(err != null ? err : result), 'mongodb');
            });
          }
        }, this));
      }
      this.mongoHasShutDown = true;
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
}).call(this);
