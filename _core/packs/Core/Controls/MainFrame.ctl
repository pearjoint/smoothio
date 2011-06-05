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
	<%ctl:Console { id: 'ctop', topDown: true }%>
	<div class="smio-console smio-console-main"></div>
	<%ctl:Console { id: 'cbottom', topDown: false }%>
</div>

