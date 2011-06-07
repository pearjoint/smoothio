###
Auto-generated from Core/Controls/SlidePanel.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_SlidePanel extends smio.Control


	init: ->
		@curItem = 0
		@items = []
		super()
		@ctlRenderers['item'] = (className, args) =>
			@items.push args.id
			"<li class=\"#{@args.itemClass} #{args.class}\" id=\"#{@id('items_' + args.id)}\">#{@renderTag "inner", null, args}</li>"
		if @args.onItemSelect and _.isFunction @args.onItemSelect
			@on 'itemSelect', @args.onItemSelect

	onLoad: ->
		(@edgePrev = $("##{@id 'edgeprev'}")).click => @scrollTo @curItem - 1
		(@edgeNext = $("##{@id 'edgenext'}")).click => @scrollTo @curItem + 1
		@scrollBox = $("##{@id 'scrollbox'}")
		@scrollTo 0, true

	onWindowResize: (w, h) ->
		@scrollTo @curItem, true

	scrollTo: (item, force) ->
		if _.isString item
			item = @items.indexOf item
		if ((item < 0) or (item >= @items.length)) and force
			item = 0
		if (force or item isnt @curItem) and (item >= 0) and (item < @items.length)
			@edgePrev.css display: if (item is 0) then 'none' else 'block'
			@edgeNext.css display: if (item is (@items.length - 1)) then 'none' else 'block'
			@on 'itemSelect', [@curItem = item, @items[item]]
			morpheus.tween 250, ((pos) => @scrollBox.scrollLeft pos), (->), null, @scrollBox.scrollLeft(), @scrollBox.scrollLeft() + $("##{@id 'items_' + @items[item]}").position().left - @edgePrev.width()


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_SlidePanel"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()
	renderHtml: ($el) ->
		if not @_html
			__r = ctls: [], m: []
			__r.o = __r.m

			__r.o.push "\n<div id=\""
			__r.o.push  @id() 
			__r.o.push "\" class=\"smio-slidepanel "
			__r.o.push  @args.class
			__r.o.push "\">\n\t<div id=\""
			__r.o.push  @id('edgeprev') 
			__r.o.push "\" class=\"smio-slidepanel-edge smio-slidepanel-edge-left\"><div class=\"smio-slidepanel-edge-arr\" x=\"#9668\">&laquo;&nbsp;&nbsp;Back</div></div>\n\t<div id=\""
			__r.o.push  @id('edgenext') 
			__r.o.push "\" class=\"smio-slidepanel-edge smio-slidepanel-edge-right\"><div class=\"smio-slidepanel-edge-arr\" x=\"#9658\">Next&nbsp;&nbsp;&raquo;</div></div>\n\t<div id=\""
			__r.o.push  @id('scrollbox') 
			__r.o.push "\" class=\"smio-slidepanel-scrollbox\">\n\t<ul id=\""
			__r.o.push  @id('items') 
			__r.o.push "\" class=\"smio-slidepanel "
			__r.o.push  @args.class
			__r.o.push "\">\n\t\t<li class=\"#{@args.edgeItemClass}\" id=\"#{@id('libefore')}\">&nbsp;</li>\n\t\t"
			__r.o.push @renderTag "inner", "", null
			__r.o.push "\n\t\t<li class=\"#{@args.edgeItemClass}\" id=\"#{@id('liafter')}\">&nbsp;</li>\n\t</ul>\n\t</div>\n</div>\n\n"
			@_html = __r.o.join ''
		if $el
			$el.html @_html
		@_html
#endif
