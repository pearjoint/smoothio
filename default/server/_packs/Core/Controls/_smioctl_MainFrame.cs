###
Auto-generated from Core/Controls/MainFrame.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_MainFrame extends smio.Control


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
		super client, parent, args, "Core_Controls", "Core_Controls_MainFrame"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()

	renderHtml: ($el) ->
		if not @_html
			__o = []
			__o.push "\n<div class=\"smio-main\" id=\""
			__o.push @id()
			__o.push "\">\n\t"
			__o.push @renderTag "ctl", "Console", { id: (@id 'ctop'), topDown: true }
			__o.push "\n\t<div class=\"smio-console smio-console-main\"></div>\n\t"
			__o.push @renderTag "ctl", "Console", { id: (@id 'cbottom'), topDown: false }
			__o.push "\n</div>\n\n"
			@_html = __o.join ''
		if $el
			$el.html @_html
		@_html
#endif
