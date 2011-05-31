(function() {
  var mongodb, node_url, smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require('./shared/PromiseProxy');
  require('./Database');
  mongodb = require('mongodb');
  node_url = require('url');
  smio = global.smoothio;
  smio.Site = (function() {
    function Site(session, url, rc) {
      this.session = session;
      this.url = url;
      this.rc = rc;
      this.server = this.session.server;
      this.doc = null;
      this.inst = this.server.inst;
      this.dbAdmin = this.inst.mongos['admin'];
      this.dbServer = this.inst.mongos["smoothio__" + this.server.serverName];
      this.dbShared = this.inst.mongos['smoothio_shared'];
      if (!this.url) {
        this.url = '/';
      }
      this.url = this.url.toLowerCase();
      this.uri = node_url.parse(this.url);
    }
    Site.prototype.checkExists = function(cb_err_hasSites) {
      if (this.doc) {
        return cb_err_hasSites(null, true);
      } else {
        return this.dbServer.withCollection("_smio_sites", __bind(function(err, col) {
          var makeQuery;
          if (err) {
            return cb_err_hasSites(err);
          }
          makeQuery = function(url) {
            return function() {
              return (url.indexOf(this._smio_url)) === 0;
            };
          };
          return (col.find({
            $where: makeQuery(this.url)
          })).toArray(__bind(function(err, results) {
            if (err) {
              return cb_err_hasSites(err);
            }
            if (results && results.length) {
              this.doc = (_.sortBy(results, function(doc) {
                return -doc._smio_url.length;
              }))[0];
              return cb_err_hasSites(null, true);
            } else {
              return col.find().nextObject(__bind(function(err, doc) {
                return cb_err_hasSites(err, doc ? true : false);
              }, this));
            }
          }, this));
        }, this));
      }
    };
    Site.prototype.getControlUpdates = function(sinceTicks, cb) {
      var ct;
      if (sinceTicks) {
        return cb(null, {});
      } else {
        ct = "SmoothioCore_CommonControls_mainframe";
        return this.checkExists(function(err, serverHasSites) {
          if (!serverHasSites) {
            ct = "SmoothioCore_ServerSetup_initialserversetup";
          }
          return cb(err, {
            "": {
              "_": ct
            }
          });
        });
      }
    };
    return Site;
  })();
}).call(this);
