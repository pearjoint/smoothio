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
			__r = ctls: [], m: []
			__r.o = __r.m

			__r.o.push "\n<div class=\"smio-main\" id=\""
			__r.o.push @id()
			__r.o.push "\">\n\t"
			__r.o.push @renderTag "ctl", "Console", { id: 'ctop', topDown: true }
			__r.o.push "\n\t<div class=\"smio-console smio-console-main\"></div>\n\t"
			__r.o.push @renderTag "ctl", "Console", { id: 'cbottom', topDown: false }
			__r.o.push "\n</div>\n\n"
			@_html = __r.o.join ''
		if $el
			$el.html @_html
		@_html
#endif
