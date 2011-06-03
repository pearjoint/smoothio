###
Auto-generated from Core/Controls/TabStrip.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_TabStrip extends smio.Control


#if client
	onLoad: ->
		super()
		for t in @args.tabs
			makeHandler = (tabID) =>
				() => @selectTab tabID
			$("##{@ctlID}_#{t}").click makeHandler t

	selectTab: (tabID) ->
		a = $("##{@ctlID}_#{tabID}")
		cls = "#{@args.tabClass}-active"
		incls = "#{@args.tabClass}-inactive"
		if not a.hasClass cls
			for t in @args.tabs
				$("##{@ctlID}_#{t}").removeClass(cls).addClass incls
			a.removeClass(incls).addClass cls
#endif


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_TabStrip"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()

	renderHtml: ($el) ->
		if not @_html
			__o = []
			__o.push "\n<div id=\""
			__o.push @ctlID
			__o.push "\" class=\""
			__o.push @renderTag "arg", "class", null
			__o.push "\">\n"
			firstDone = false
			for tab in @args.tabs
				__o.push "\n\t\t<a href=\"javascript:void(0);\" id=\""
				__o.push @id(tab)
				__o.push "\" class=\""
				__o.push @renderTag "arg", "tabClass", null
				__o.push " "
				__o.push @args.tabClass + (if firstDone then '-inactive' else '-active')
				__o.push "\">"
				__o.push @res @args.resPrefix + tab
				__o.push "</a>\n\t\t"
				if not firstDone
					firstDone = true
			__o.push "\n</div>\n\n"
			@_html = __o.join ''
		if $el
			$el.html @_html
		@_html
#endif
