smio = global.smoothio

smio.init = ->
	smio.util = new smio.Util
	setInterval (-> $('#smio_body').css "background-image": "url('/_/file/images/bg#{smio.util.randomInt(4)}.jpg')"), 5000

