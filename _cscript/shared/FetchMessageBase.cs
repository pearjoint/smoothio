
smio = global.smoothio

class smio.FetchMessageBase
	constructor: (@msg, funcs) ->
		if not @msg
			@msg = {}
		for name, args of funcs
			@[name].apply @, args

	clear: () ->
		for k in @msg
			@msg[k] = null
			delete @msg[k]

	ticks: (ticks) ->
		if ticks?
			@msg.t = ticks
		@msg.t

