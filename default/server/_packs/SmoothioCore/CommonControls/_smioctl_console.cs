###
Auto-generated from SmoothioCore/CommonControls/console.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_SmoothioCore_CommonControls_console extends smio.Control

#if client
	renderHtml: ->
		if not @_html
			parts = []
			if args['topDown']
				parts.push "\n<div class=\"smio-console smio-console-"
				parts.push @renderTag "arg", "id", null
				parts.push "\">\n\t<div class=\"smio-console-ever\">header</div>\n\t<div class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div class=\"smio-console-detail\" style=\"display: none;\">details</div>\n</div>\n"
			else
				parts.push "\n<div class=\"smio-console smio-console-"
				parts.push @renderTag "arg", "id", null
				parts.push "\">\n\t<div class=\"smio-console-detail\" style=\"display: none;\">details</div>\n\t<div class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div class=\"smio-console-ever\">footer</div>\n</div>\n\n"
			@_html = parts.join ''
		@_html
#endif
