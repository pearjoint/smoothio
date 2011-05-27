#if server
require './FetchMessageBase'
#endif

smio = global.smoothio

class smio.FetchRequestMessage extends smio.FetchMessageBase
	url: (url) ->
		if url?
			@msg.u = url
		@msg.u

