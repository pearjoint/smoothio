
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
		if cfg
			@msg.s = cfg
		@msg.s

	ticks: (ticks) =>
		if ticks?
			@msg.t = ticks
		@msg.t

