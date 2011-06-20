#if server
_ = require 'underscore'
require './Util'
#endif

smio = global.smoothio

class smio.FetchMessageBase

	constructor: (@msg, funcs) ->
		if not @msg
			@msg = {}
		for name, args of funcs
			@[name](args...)

	clear: () =>
		for k of @msg
			@msg[k] = null
			delete @msg[k]

	settings: (cfg) =>
		if cfg and not _.isString(cfg)
			if not @msg.s
				@msg.s = cfg
			else if not _.isArray(cfg)
				@msg.s = smio.Util.Object.mergeDefaults(@msg.s, cfg)
			else if _.isArray(@msg.s)
				@msg.s.push(v) for v in cfg when not (v in @msg.s)
			else
				@msg.s = cfg
		if _.isString(cfg) then @msg.s?[cfg] else @msg.s

	ticks: (ticks) =>
		if ticks?
			@msg.t = ticks
		@msg.t

