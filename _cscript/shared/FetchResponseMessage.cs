#if server
require './FetchMessageBase'
#endif

smio = global.smoothio

class smio.FetchResponseMessage extends smio.FetchMessageBase

	controls: (ctls) =>
		if ctls
			@msg.f = ctls
		@msg.f

	errors: (errs) =>
		if errs and errs.length
			if not @msg.e
				@msg.e = []
			for e in errs
				@msg.e.push(e)
		@msg.e

