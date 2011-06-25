#if server
_ = require 'underscore'
require './FetchMessageBase'
#endif

smio = global.smoothio

class smio.FetchResponseMessage extends smio.FetchMessageBase

	controls: (ctls) =>
		if ctls
			@msg._f = ctls
		@msg._f

	errors: (errs...) =>
		if errs
			if not @msg._e
				@msg._e = []
			for e in _.flatten(errs)
				@msg._e.push(e)
		@msg._e

