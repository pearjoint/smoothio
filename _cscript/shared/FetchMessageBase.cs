#if server
_ = require 'underscore'
require './Util'
#endif

smio = global.smoothio

class smio.FetchMessageBase

	constructor: (msg, funcs) ->
		if (msg instanceof smio.FetchMessageBase)
			@msg = msg.msg
		else
			@msg = msg
		if not @msg
			@msg = {}
		for name, args of funcs
			@[name]((if _.isArray(args) then args else [args])...)

	_named: (name, arg) =>
		if arg and not _.isString(arg)
			if not @msg[name]
				@msg[name] = arg
			else if not _.isArray(arg)
				@msg[name] = smio.Util.Object.mergeDefaults(@msg[name], arg)
			else if _.isArray(@msg[name])
				@msg[name].push(v) for v in arg when not (v in @msg[name])
			else
				@msg[named] = arg
		if _.isString(arg) then @msg[name]?[arg] else @msg[name]

	clear: () =>
		for k of @msg
			@msg[k] = null
			delete @msg[k]

	cmd: (cmdName) =>
		if cmdName
			@msg._c = cmdName
		@msg._c

	ctlID: (ctlID) =>
		if ctlID
			@msg._i = ctlID
		@msg._i

	merge: (fm) =>
		for k, v of fm.msg
			@msg[k] = v

	settings: (cfg) =>
		@_named('_s', cfg)

	ticks: (ticks) =>
		if ticks?
			@msg._t = ticks
		@msg._t

