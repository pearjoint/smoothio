###
Auto-generated from Core/Controls/SlidePanel.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_SlidePanel extends smio.Control


#if client
	
	renderTemplate: ->
		ul =
			class: "smio-slidepanel #{@args.class or ''}"
			'li #libefore':
				html: ['&nbsp;']
		if @args.items
			for itemID, item of @args.items
				@items.push itemID
				ul["li #items_#{itemID} .#{@args.itemClass or ''}"] = item
		ul['li #liafter'] =
			html: ['&nbsp;']
		div:
			id: ''
			class: "smio-slidepanel #{@args.class}"
			'div #edgeprev .smio-slidepanel-edge .smio-slidepanel-edge-left':
				'div .smio-slidepanel-edge-arr .x9668': [@r 'slidepanel_prev']
			'div #edgenext .smio-slidepanel-edge .smio-slidepanel-edge-right':
				'div .smio-slidepanel-edge-arr .x9658': [@r 'slidepanel_next']
			'div #scrollbox .smio-slidepanel-scrollbox':
				'ul #items': ul
	
	init: ->
		@curItem = 0
		@items = []
		super()
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
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_SlidePanel"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()