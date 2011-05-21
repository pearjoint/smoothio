<%
	if args['topDown']
%>
<div class="smio-console smio-console-<%arg:id%>">
	<div class="smio-console-ever">header</div>
	<div class="smio-console-hover" style="display: none;">hover</div>
	<div class="smio-console-detail" style="display: none;">details</div>
</div>
<%
	else
%>
<div class="smio-console smio-console-<%arg:id%>">
	<div class="smio-console-detail" style="display: none;">details</div>
	<div class="smio-console-hover" style="display: none;">hover</div>
	<div class="smio-console-ever">footer</div>
</div>

