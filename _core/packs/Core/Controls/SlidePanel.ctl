<%script:
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
%>
<div id="<%= @id() %>" class="smio-slidepanel <%= @args.class%>">
	<div id="<%= @id('edgeprev') %>" class="smio-slidepanel-edge smio-slidepanel-edge-left"><div class="smio-slidepanel-edge-arr" x="#9668">&laquo;&nbsp;&nbsp;back</div></div>
	<div id="<%= @id('edgenext') %>" class="smio-slidepanel-edge smio-slidepanel-edge-right"><div class="smio-slidepanel-edge-arr" x="#9658">next&nbsp;&nbsp;&raquo;</div></div>
	<div id="<%= @id('scrollbox') %>" class="smio-slidepanel-scrollbox">
	<ul id="<%= @id('items') %>" class="smio-slidepanel <%= @args.class%>">
		<li class="#{@args.edgeItemClass}" id="#{@id('libefore')}">&nbsp;</li>
		<%inner:%>
		<li class="#{@args.edgeItemClass}" id="#{@id('liafter')}">&nbsp;</li>
	</ul>
	</div>
</div>

