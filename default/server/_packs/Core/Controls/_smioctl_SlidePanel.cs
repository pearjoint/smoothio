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

	onLoad: ->
		@scrollTo 0, true

	onWindowResize: (w, h) ->
		@scrollTo @curItem, true

	scrollTo: (item, force) ->
		if _.isString item
			item = @items.indexOf item
		if item >= 0 and (force or item isnt @curItem)
			@curItem = item
			w = $("##{@id 'scrollprev'}").width()
			el = $("##{@id 'scrollbox'}")
			el2 = $("##{@id 'before'}")
			morpheus.tween 250, ((pos) => el.scrollLeft pos), (->), null, el.scrollLeft(), el.scrollLeft() + $("##{@id 'items_' + @items[item]}").position().left - w


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_SlidePanel"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()

	renderHtml: ($el) ->
		if not @_html
			__r =
				ctls: []
				m: []
			__r.o = __r.m
			__r.o.push "\n<div id=\""
			__r.o.push  @id() 
			__r.o.push "\" class=\"smio-slidepanel "
			__r.o.push  @args.class
			__r.o.push "\">\n\t<div id=\""
			__r.o.push  @id('scrollprev') 
			__r.o.push "\" class=\"smio-slidepanel-edge smio-slidepanel-edge-left\"></div>\n\t<div id=\""
			__r.o.push  @id('scrollnext') 
			__r.o.push "\" class=\"smio-slidepanel-edge smio-slidepanel-edge-right\"></div>\n\t<div id=\""
			__r.o.push  @id('scrollbox') 
			__r.o.push "\" class=\"smio-slidepanel-scrollbox\">\n\t<ul id=\""
			__r.o.push  @id('items') 
			__r.o.push "\" class=\"smio-slidepanel "
			__r.o.push  @args.class
			__r.o.push "\">\n\t\t<li class=\"#{@args.itemClass}\" id=\"#{@id('before')}\">&nbsp;</li>\n\t\t"
			__r.o.push @renderTag "inner", "", null
			__r.o.push "\n\t\t<li class=\"#{@args.itemClass}\" id=\"#{@id('after')}\">&nbsp;</li>\n\t</ul>\n\t</div>\n</div>\n\n"
			@_html = __r.o.join ''
		if $el
			$el.html @_html
		@_html
#endif
