###
Auto-generated from SmoothioCore/CommonControls/console.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_SmoothioCore_CommonControls_console extends smio.Control

#if client
	constructor: (args) ->
		super args, "SmoothioCore_CommonControls", "SmoothioCore_CommonControls_console"

	renderHtml: ->
		if not @_html
			parts = []
			if @args['topDown']
				parts.push "\n<div id=\""
				parts.push @id()
				parts.push "\" class=\"smio-console smio-console-top\">\n\t<div class=\"smio-console-ever\">header</div>\n\t<div class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div class=\"smio-console-detail\" style=\"display: none;\">details</div>\n</div>\n"
			else
				parts.push "\n<div id=\""
				parts.push @id()
				parts.push "\" class=\"smio-console smio-console-bottom\">\n\t<div class=\"smio-console-detail\" style=\"display: none;\">details</div>\n\t<div class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div class=\"smio-console-ever\">footer</div>\n</div>\n\n"
			@_html = parts.join ''
		@_html
#endif
