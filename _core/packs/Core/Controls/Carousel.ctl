<%script:
	init: ->
		super()
		@ctlRenderers['item'] = (className, args) =>
			itemID = @id(args.id)
			content = @renderTag "inner", null, args
			"<li id=\"#{itemID}\">#{content}</li>"

	onLoad: ->
		super()
		@el[0].scrollLeft = 200
%>
<div id="<%= @id() %>" class="smio-carousel">
	<ul id="<%= @id('ul') %>" class="smio-carousel">
		<%inner:%>
	</ul>
</div>

