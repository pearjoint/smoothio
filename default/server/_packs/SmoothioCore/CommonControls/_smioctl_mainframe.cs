###
Auto-generated from SmoothioCore/CommonControls/mainframe.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_SmoothioCore_CommonControls_mainframe extends smio.Control


#if server
	test: () ->
		xy = "serverside"
#endif
#if client
	test: () ->
		xy = "clientside"
#endif


#if client
	renderHtml: ->
		if not @_html
			parts = []
			parts.push "\n<div class=\"smio-main\" id=\""
			parts.push id
			parts.push "\">\n\t"
			parts.push @renderTag "ctl", "console", { id: 'top', topDown: true }
			parts.push "\n\t<div class=\"smio-console smio-console-main\"><br/><br/>foo zeh content</div>\n\t"
			parts.push @renderTag "ctl", "console", { id: 'bottom', topDown: false }
			parts.push "\n</div>\n\n"
			@_html = parts.join ''
		@_html
#endif
