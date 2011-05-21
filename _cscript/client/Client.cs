smio = global.smoothio

smio.init = ->
	smio.util = new smio.Util
	setInterval (-> $('#smio_body').css "background-image": "url('/_/file/images/bg#{smio.util.math.randomInt(4)}.jpg')"), 5000

$(document).ready ->
	smio.init()
	$('#smio_body').html (new smio.Packs_SmoothioCore_CommonControls_mainframe { id: 'sm' }).renderHtml()

