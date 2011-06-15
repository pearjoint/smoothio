###
Auto-generated from Core/Controls/MainFrame.ctl
###
#if server
require '../../../_jscript/shared/Control'
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


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_MainFrame"

	classNamespace: ->
		"Core_Controls"
	renderHtml: ($el) =>
		__r = ctls: [], m: []
		__r.p = ((r) -> (v) -> r.o.push v) __r
		__r.o = __r.m

		__r.p "\n<div class=\"smio-main\" id=\""
		__r.p @id()
		__r.p "\">\n\t"
		__r.p @renderTag "ctl", "Console", { id: 'ctop', topDown: true }
		__r.p "\n\t<div class=\"smio-console smio-console-main\"></div>\n\t"
		__r.p @renderTag "ctl", "Console", { id: 'cbottom', topDown: false }
		__r.p "\n</div>\n\n"
		_html = __r.o.join ''
		if $el
			$el.html _html
		_html
