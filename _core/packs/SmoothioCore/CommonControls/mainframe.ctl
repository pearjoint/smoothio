<%script:
#if server
	test: () ->
		xy = "serverside"
#endif
#if client
	test: () ->
		xy = "clientside"
#endif
%>
<div class="smio-main" id="<%=@id()%>">
	<%ctl:console { id: (@id 'ctop'), topDown: true }%>
	<div class="smio-console smio-console-main"><br/><br/>foo zeh content</div>
	<%ctl:console { id: (@id 'cbottom'), topDown: false }%>
</div>

