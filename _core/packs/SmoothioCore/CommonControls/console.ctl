<%script:
#if client
	init: ->

	onLoad: ($el) ->
		super()
		if not @args['topDown']
			$("##{@ctlID}_detail").insertBefore "##{@ctlID}_ever"
			$("##{@ctlID}_hover").insertBefore "##{@ctlID}_ever"

#endif
%>
<div id="<%=@ctlID%>" class="smio-console smio-console-<%= if @args['topDown'] then 'top' else 'bottom'%>">
	<div id="<%=@ctlID%>_ever" class="smio-console-ever">header</div>
	<div id="<%=@ctlID%>_hover" class="smio-console-hover" style="display: none;">hover</div>
	<div id="<%=@ctlID%>_detail" class="smio-console-detail" style="display: none;">details</div>
</div>

