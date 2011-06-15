###
Auto-generated from Core/Controls/Console.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Console extends smio.Control


#if client
	init: =>

	onLoad: ($el) =>
		super()
		if not @args['topDown']
			$("##{@id()}_detail").insertBefore("##{@id()}_ever")
			$("##{@id()}_hover").insertBefore("##{@id()}_ever")

#endif


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_Console"

	classNamespace: ->
		"Core_Controls"
	renderHtml: ($el) =>
		__r = ctls: [], m: []
		__r.p = ((r) -> (v) -> r.o.push v) __r
		__r.o = __r.m

		__r.p "\n<div id=\""
		__r.p @id()
		__r.p "\" class=\"smio-console smio-console-"
		__r.p  if @args['topDown'] then 'top' else 'bottom'
		__r.p "\">\n\t<div id=\""
		__r.p @id()
		__r.p "_ever\" class=\"smio-console-ever\">header</div>\n\t<div id=\""
		__r.p @id()
		__r.p "_hover\" class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div id=\""
		__r.p @id()
		__r.p "_detail\" class=\"smio-console-detail\" style=\"display: none;\">details</div>\n</div>\n\n"
		_html = __r.o.join ''
		if $el
			$el.html _html
		_html
