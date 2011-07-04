(function() {
  var coffee, node_fs, node_path, node_util, smio, stylus, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  _ = require('underscore');
  _.mixin(require('underscore.string'));
  coffee = require('coffee-script');
  node_fs = require('fs');
  node_path = require('path');
  node_util = require('util');
  stylus = require('stylus');
  require('./shared/Control');
  smio = global.smoothio;
  smio.Pack = (function() {
    function Pack(inst, packs, packPath, packName) {
      this.inst = inst;
      this.packs = packs;
      this.packPath = packPath;
      this.packName = packName;
      this.load = __bind(this.load, this);
      this.loaded = false;
      this.loadError = null;
      this.dependsOn = {};
      this.config = {};
    }
    Pack.prototype.load = function() {
      var dep, dontCopy, lastFilePath, pack, _i, _len, _ref, _ref2;
      if ((!this.loaded) && (!(this.loadError != null))) {
        try {
          this.inst.loadResourceSets(this.packPath, true, __bind(function(fpath, fname, relpath) {
            var parts;
            parts = [this.packName];
            if (relpath.indexOf('/') > 0) {
              parts.push(smio.Util.Array.removeLast(relpath.split('/')));
            }
            if (fname !== 'pack') {
              parts.push(fname);
            }
            return parts.join('_');
          }, this));
          dontCopy = ['*.ccfg', '*.cres'];
          smio.logit(this.inst.r('log_pack_loading', this.packName), 'packs.' + this.packName);
          lastFilePath = node_path.join(this.packPath, 'pack.ccfg');
          smio.compileConfigFile(lastFilePath, "server/_packs/" + this.packName);
          this.config = smio.Util.Object.mergeDefaults(require("../_packs/" + this.packName + "/_cfg_pack"), {
            pack: {
              dontcopy: dontCopy
            }
          });
          (_ref = smio.Util.Array).ensure.apply(_ref, [this.config.pack.dontcopy].concat(__slice.call(dontCopy)));
          if ((this.config.pack['depends_on'] != null) && this.config.pack.depends_on.length) {
            _ref2 = this.config.pack.depends_on;
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              dep = _ref2[_i];
              this.dependsOn[dep] = pack = this.packs.all[dep];
              if (!(pack != null)) {
                throw new Error(this.inst.r('log_pack_error_depends1', dep));
              }
              if (!pack.loaded) {
                if (!(pack.loadError != null)) {
                  pack.load();
                }
                if (pack.loadError) {
                  throw new Error(this.inst.r('log_pack_error_depends2', dep));
                }
              }
            }
          }
          smio.walkDir(this.packPath, null, __bind(function(fpath, fname, relPath) {
            var ccsContent, mixinPath, outDirPathClient, outDirPathServer, pattern, stylContent, tmplContent;
            outDirPathClient = node_path.join("server/pub/_packs/" + this.packName, relPath.substr(0, relPath.lastIndexOf('/')));
            outDirPathServer = node_path.join("server/_packs/" + this.packName, relPath.substr(0, relPath.lastIndexOf('/')));
            if (_.endsWith(fname, '.styl') && (stylContent = smio.Util.FileSystem.readTextFile(fpath))) {
              lastFilePath = fpath;
              mixinPath = node_path.resolve('../_core/stylus/_mixin');
              return stylus("@import '" + mixinPath + "'\n" + stylContent).set('filename', fpath).render(__bind(function(err, css) {
                if (err) {
                  err['ml_error_filepath'] = fpath;
                  return smio.logit(this.inst.r('log_pack_error_compile', fpath, this.inst.formatError(err)), 'packs.' + this.packName);
                } else if (css) {
                  return node_fs.writeFileSync(node_path.join(outDirPathClient, "_styl_" + fname.substr(0, fname.lastIndexOf('.')) + '.css'), css);
                }
              }, this));
            } else if (_.endsWith(fname, '.cs')) {
              return smio.compileCoffeeScripts(fpath, outDirPathServer, outDirPathClient, true, true);
            } else if (_.endsWith(fname, '.ctl') && (tmplContent = smio.Util.FileSystem.readTextFile(fpath))) {
              lastFilePath = fpath;
              if ((ccsContent = smio.Control.compile(this.inst, tmplContent, node_path.join(this.packName, relPath)))) {
                node_fs.writeFileSync(node_path.join(outDirPathServer, "_ctl_" + fname.substr(0, fname.lastIndexOf('.')) + '.cs'), ccsContent);
                return smio.compileCoffeeScripts(ccsContent, outDirPathServer, outDirPathClient, true, false, "_ctl_" + fname);
              }
            } else {
              if (!_.any((function() {
                var _j, _len2, _ref3, _results;
                _ref3 = this.config.pack.dontcopy;
                _results = [];
                for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
                  pattern = _ref3[_j];
                  _results.push(smio.Util.FileSystem.isPathMatch(fname, pattern));
                }
                return _results;
              }).call(this))) {
                return node_fs.linkSync(fpath, node_path.join(outDirPathClient, fname));
              }
            }
          }, this));
          smio.logit(this.inst.r('log_pack_loaded', this.packName), 'packs.' + this.packName);
          return this.loaded = true;
        } catch (err) {
          if ((!(err['ml_error_filepath'] != null)) && (typeof lastFilePath !== "undefined" && lastFilePath !== null)) {
            err['ml_error_filepath'] = lastFilePath;
          }
          this.loadError = err;
          return smio.logit(this.inst.r('log_pack_error_notloaded', this.packName, this.inst.formatError(err)), 'packs.' + this.packName);
        }
      }
    };
    return Pack;
  })();
  smio.Packs = (function() {
    function Packs(inst) {
      var p, pack, pp, _i, _j, _len, _len2, _ref, _ref2, _ref3;
      this.inst = inst;
      this.all = {};
      smio.Util.FileSystem.ensureDirs('../_core/packs', 'server/pub/_packs');
      smio.Util.FileSystem.ensureDirs('../_core/packs', 'server/_packs');
      smio.Util.FileSystem.ensureDirs('packs', 'server/pub/_packs');
      smio.Util.FileSystem.ensureDirs('packs', 'server/_packs');
      _ref = smio.Util.Array.ensurePos(node_fs.readdirSync('../_core/packs'), 'Core', 0);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (node_fs.statSync(pp = node_path.join('../_core/packs', p)).isDirectory()) {
          this.all[p] = new smio.Pack(this.inst, this, pp, p);
        }
      }
      _ref2 = node_fs.readdirSync('packs');
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        p = _ref2[_j];
        if (node_fs.statSync(pp = node_path.join('packs', p)).isDirectory()) {
          this.all[p] = new smio.Pack(this.inst, this, pp, p);
        }
      }
      if (this.corePack = this.all['Core']) {
        _ref3 = this.all;
        for (p in _ref3) {
          pack = _ref3[p];
          pack.load();
        }
      }
    }
    return Packs;
  })();
}).call(this);
