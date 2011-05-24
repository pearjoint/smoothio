<%lang:cscript%>
<%control:'subctl', '../another_control.ctl'%>
<h3>The big control test</h3>
<%stylus
	h3
		background gold
%>
<b>the admin control: <%= 4 + 3%></b>
<hr size="1" noshade="noshade"/>
Sub-control:
<div>
	<%ctl:'subctl', 'prop1': 'the test val'%>
</div>
Ending the sub-control

