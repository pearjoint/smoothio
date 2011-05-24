###
Auto-generated from SmoothioCore/CommonControls/console.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_SmoothioCore_CommonControls_console extends smio.Control


#if client
	init: ->

	onLoad: ($el) ->
		super $el
		if not @args['topDown']
			$("##{@ctlID}_detail").insertBefore "##{@ctlID}_ever"
			$("##{@ctlID}_hover").insertBefore "##{@ctlID}_ever"

#endif


#if client
	constructor: (args) ->
		super args, "SmoothioCore_CommonControls", "SmoothioCore_CommonControls_console"
		@init()

	renderHtml: ($el) ->
		if not @_html
			parts = []
			parts.push "\n<div id=\""
			parts.push @ctlID
			parts.push "\" class=\"smio-console smio-console-"
			parts.push  if @args['topDown'] then 'top' else 'bottom'
			parts.push "\">\n\t<div id=\""
			parts.push @ctlID
			parts.push "_ever\" class=\"smio-console-ever\">header</div>\n\t<div id=\""
			parts.push @ctlID
			parts.push "_hover\" class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div id=\""
			parts.push @ctlID
			parts.push "_detail\" class=\"smio-console-detail\" style=\"display: none;\">details</div>\n</div>\n\n"
			@_html = parts.join ''
		if $el
			$el.html @_html
		@_html
#endif
