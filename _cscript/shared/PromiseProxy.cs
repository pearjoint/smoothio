#if server
_ = require 'underscore'
require './Util'

smio = global.smoothio


#_as = (x) -> new smio.PromiseProxy x
#_as(@dbServer).connect(_as(mongodb.Db)).createCollection("_smio_sites", _as(mongodb.Collection))._callAll (err, col) ->


class smio.PromiseProxy
	constructor: (obj) ->
		@__smioprox =
			prot: if obj.prototype then obj.prototype else (if obj.constructor then obj.constructor.prototype else obj.__proto__)
			inst: if _.isFunction obj then null else obj
			chain: []
			parent: null
		template = if @__smioprox.prot then @__smioprox.prot else @__smioprox.inst
		makeProxyFunc = (that, name) ->
			() ->
				smio.logit "CALL #{name}"
				args = _.toArray arguments
				nextPromise = that
				if args and args.length and (lastArg = args[args.length - 1]) and lastArg['__smioprox'] and lastArg['_callAll']
					nextPromise = args[args.length - 1]
					nextPromise.__smioprox.parent = that
					args.length = args.length - 1
				that.__smioprox.chain.push [name, args, nextPromise]
				nextPromise
		for k, v of template
			if (_.isFunction v) and k isnt '_callAll'
				@[k] = makeProxyFunc @, k

	_callAll: (inst, cb, index) ->
		if (not cb) and (not index?) and inst and _.isFunction inst
			if @__smioprox.parent
				return @__smioprox.parent._callAll inst
			else
				cb = inst
				inst = @__smioprox.inst
		if not index?
			index = 0
		if not inst
			cb (new Error "No inst given!!"), null
		else
			run = (instance, name, args, next, rcb, ix, isNextDifferent) ->
				cbr = (err, ret) ->
					if err
						rcb err, ret
					else if (isNextDifferent and (ix < next.__smioprox.chain.length)) or ((not isNextDifferent) and (ix < (next.__smioprox.chain.length - 1)))
						next._callAll (if ret then ret else instance), rcb, if isNextDifferent then 0 else ix + 1
					else
						rcb null, ret
				instance[name].apply instance, smio.Util.Array.add args, cbr
			call = @__smioprox.chain[index]
			run inst, call[0], call[1], call[2], cb, index, call[2] isnt @
#endif

