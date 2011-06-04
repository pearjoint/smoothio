###
Auto-generated from Core/Controls/Console.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Console extends smio.Control


#if client
	init: ->

	onLoad: ($el) ->
		super()
		if not @args['topDown']
			$("##{@ctlID}_detail").insertBefore "##{@ctlID}_ever"
			$("##{@ctlID}_hover").insertBefore "##{@ctlID}_ever"

#endif


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_Console"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()

	renderHtml: ($el) ->
		if not @_html
			__r =
				ctls: []
				m: []
				o: null
			__r.o = __r.m
			__r.o.push "\n<div id=\""
			__r.o.push @ctlID
			__r.o.push "\" class=\"smio-console smio-console-"
			__r.o.push  if @args['topDown'] then 'top' else 'bottom'
			__r.o.push "\">\n\t<div id=\""
			__r.o.push @ctlID
			__r.o.push "_ever\" class=\"smio-console-ever\">header</div>\n\t<div id=\""
			__r.o.push @ctlID
			__r.o.push "_hover\" class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div id=\""
			__r.o.push @ctlID
			__r.o.push "_detail\" class=\"smio-console-detail\" style=\"display: none;\">details</div>\n</div>\n\n"
			@_html = __r.o.join ''
		if $el
			$el.html @_html
		@_html
#endif
