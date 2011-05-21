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
<div class="smio-main" id="<%=id%>">
	<%ctl:console { id: 'top', topDown: true }%>
	<div class="smio-console smio-console-main"><br/><br/>foo zeh content</div>
	<%ctl:console { id: 'bottom', topDown: false }%>
</div>

