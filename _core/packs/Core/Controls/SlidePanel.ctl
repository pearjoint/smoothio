<%script:
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
%>
<div id="<%= @id() %>" class="smio-slidepanel <%= @args.class%>">
	<div id="<%= @id('scrollprev') %>" class="smio-slidepanel-edge smio-slidepanel-edge-left"></div>
	<div id="<%= @id('scrollnext') %>" class="smio-slidepanel-edge smio-slidepanel-edge-right"></div>
	<div id="<%= @id('scrollbox') %>" class="smio-slidepanel-scrollbox">
	<ul id="<%= @id('items') %>" class="smio-slidepanel <%= @args.class%>">
		<li class="#{@args.itemClass}" id="#{@id('before')}">&nbsp;</li>
		<%inner:%>
		<li class="#{@args.itemClass}" id="#{@id('after')}">&nbsp;</li>
	</ul>
	</div>
</div>

