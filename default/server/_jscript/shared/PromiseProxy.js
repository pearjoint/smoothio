(function() {
  var smio, _;
  _ = require('underscore');
  require('./Util');
  smio = global.smoothio;
  smio.PromiseProxy = (function() {
    function PromiseProxy(obj) {
      var k, makeProxyFunc, template, v;
      this.__smioprox = {
        prot: obj.prototype ? obj.prototype : (obj.constructor ? obj.constructor.prototype : obj.__proto__),
        inst: _.isFunction(obj) ? null : obj,
        chain: [],
        parent: null
      };
      template = this.__smioprox.prot ? this.__smioprox.prot : this.__smioprox.inst;
      makeProxyFunc = function(that, name) {
        return function() {
          var args, lastArg, nextPromise;
          smio.logit("CALL " + name);
          args = _.toArray(arguments);
          nextPromise = that;
          if (args && args.length && (lastArg = args[args.length - 1]) && lastArg['__smioprox'] && lastArg['_callAll']) {
            nextPromise = args[args.length - 1];
            nextPromise.__smioprox.parent = that;
            args.length = args.length - 1;
          }
          that.__smioprox.chain.push([name, args, nextPromise]);
          return nextPromise;
        };
      };
      for (k in template) {
        v = template[k];
        if ((_.isFunction(v)) && k !== '_callAll') {
          this[k] = makeProxyFunc(this, k);
        }
      }
    }
    PromiseProxy.prototype._callAll = function(inst, cb, index) {
      var call, run;
      if ((!cb) && (!(index != null)) && inst && _.isFunction(inst)) {
        if (this.__smioprox.parent) {
          return this.__smioprox.parent._callAll(inst);
        } else {
          cb = inst;
          inst = this.__smioprox.inst;
        }
      }
      if (!(index != null)) {
        index = 0;
      }
      if (!inst) {
        return cb(new Error("No inst given!!"), null);
      } else {
        run = function(instance, name, args, next, rcb, ix, isNextDifferent) {
          var cbr;
          cbr = function(err, ret) {
            if (err) {
              return rcb(err, ret);
            } else if ((isNextDifferent && (ix < next.__smioprox.chain.length)) || ((!isNextDifferent) && (ix < (next.__smioprox.chain.length - 1)))) {
              return next._callAll((ret ? ret : instance), rcb, isNextDifferent ? 0 : ix + 1);
            } else {
              return rcb(null, ret);
            }
          };
          return instance[name].apply(instance, smio.Util.Array.add(args, cbr));
        };
        call = this.__smioprox.chain[index];
        return run(inst, call[0], call[1], call[2], cb, index, call[2] !== this);
      }
    };
    return PromiseProxy;
  })();
}).call(this);
