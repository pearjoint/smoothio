<%script:
#if client
	init: =>

	onLoad: ($el) =>
		super()
		if not @args['topDown']
			$("##{@id()}_detail").insertBefore("##{@id()}_ever")
			$("##{@id()}_hover").insertBefore("##{@id()}_ever")

#endif
%>
<div id="<%=@id()%>" class="smio-console smio-console-<%= if @args['topDown'] then 'top' else 'bottom'%>">
	<div id="<%=@id()%>_ever" class="smio-console-ever">header</div>
	<div id="<%=@id()%>_hover" class="smio-console-hover" style="display: none;">hover</div>
	<div id="<%=@id()%>_detail" class="smio-console-detail" style="display: none;">details</div>
</div>

