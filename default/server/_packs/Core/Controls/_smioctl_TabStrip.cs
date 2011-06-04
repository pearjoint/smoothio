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
			__r =
				ctls: []
				m: []
				o: null
			__r.o = __r.m
			__r.o.push "\n<div id=\""
			__r.o.push @ctlID
			__r.o.push "\" class=\""
			__r.o.push @renderTag "arg", "class", null
			__r.o.push "\">\n"
			firstDone = false
			for tab in @args.tabs
				__r.o.push "\n\t\t<a href=\"javascript:void(0);\" id=\""
				__r.o.push @id(tab)
				__r.o.push "\" class=\""
				__r.o.push @renderTag "arg", "tabClass", null
				__r.o.push " "
				__r.o.push @args.tabClass + (if firstDone then '-inactive' else '-active')
				__r.o.push "\">"
				__r.o.push @res @args.resPrefix + tab
				__r.o.push "</a>\n\t\t"
				if not firstDone
					firstDone = true
			__r.o.push "\n</div>\n\n"
			@_html = __r.o.join ''
		if $el
			$el.html @_html
		@_html
#endif
