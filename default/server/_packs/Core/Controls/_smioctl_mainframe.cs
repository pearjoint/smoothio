###
Auto-generated from Core/Controls/mainframe.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_mainframe extends smio.Control


#if server
	test: () ->
		xy = "serverside"
#endif
#if client
	test: () ->
		xy = "clientside"
#endif


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_mainframe"
		@init()

	renderHtml: ($el) ->
		if not @_html
			parts = []
			parts.push "\n<div class=\"smio-main\" id=\""
			parts.push @id()
			parts.push "\">\n\t"
			parts.push @renderTag "ctl", "console", { id: (@id 'ctop'), topDown: true }
			parts.push "\n\t<div class=\"smio-console smio-console-main\"></div>\n\t"
			parts.push @renderTag "ctl", "console", { id: (@id 'cbottom'), topDown: false }
			parts.push "\n</div>\n\n"
			@_html = parts.join ''
		if $el
			$el.html @_html
		@_html
#endif
