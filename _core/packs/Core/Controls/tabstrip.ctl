<div id="<%=@ctlID%>" class="<%arg:class%>">
<%
	firstDone = false
	for tab in @args['tabs']
		%>
		<a href="#" id="<%=@id(tab)%>" class="<%arg:tabClass%><%=if firstDone then '' else (' ' + @args['tabClass'] + '-active')%>"><%=@res @args['resPrefix'] + tab%></a>
		<%
		if not firstDone
			firstDone = true
	%>
</div>

