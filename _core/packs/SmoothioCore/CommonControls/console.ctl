<%
	if @args['topDown']
%>
<div id="<%=@id()%>" class="smio-console smio-console-top">
	<div class="smio-console-ever">header</div>
	<div class="smio-console-hover" style="display: none;">hover</div>
	<div class="smio-console-detail" style="display: none;">details</div>
</div>
<%
	else
%>
<div id="<%=@id()%>" class="smio-console smio-console-bottom">
	<div class="smio-console-detail" style="display: none;">details</div>
	<div class="smio-console-hover" style="display: none;">hover</div>
	<div class="smio-console-ever">footer</div>
</div>

