(function() {
  var mongodb, node_util, smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  mongodb = require('mongodb');
  node_util = require('util');
  smio = global.smoothio;
  smio.Database = (function() {
    function Database(inst, mongo, name, title, server, interval) {
      this.inst = inst;
      this.mongo = mongo;
      this.name = name;
      this.title = title;
      this.server = server;
      this.db = new mongodb.Db(this.name, this.mongo, {
        "strict": true,
        "native_parser": false
      });
      if (this.server != null) {
        this.server.db = this.db;
      }
      if (interval) {
        setTimeout((__bind(function() {
          return this.connect(__bind(function(err, db) {
            return smio.logit(this.inst.r((err ? 'log_mongo_error_dbnoconnect' : 'log_mongo_dbconnected'), this.title, (err ? this.inst.formatError(err) : '')), 'mongodb.' + this.name);
          }, this));
        }, this)), interval);
      }
    }
    Database.prototype.connect = function(func) {
      if (this.db.state === 'connected') {
        func(null, this.db);
      } else {
        this.db.open(__bind(function(err, db) {
          return func(err, db);
        }, this));
      }
      return this.db;
    };
    return Database;
  })();
}).call(this);
