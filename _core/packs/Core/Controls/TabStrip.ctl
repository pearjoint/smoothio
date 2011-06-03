<%script:
#if client
	onLoad: ->
		super()
		for t in @args.tabs
			makeHandler = (tabID) =>
				() => @selectTab tabID
			$("##{@ctlID}_#{t}").click makeHandler t

	selectTab: (tabID) ->
		a = $("##{@ctlID}_#{tabID}")
		cls = "#{@args.tabClass}-active"
		incls = "#{@args.tabClass}-inactive"
		if not a.hasClass cls
			for t in @args.tabs
				$("##{@ctlID}_#{t}").removeClass(cls).addClass incls
			a.removeClass(incls).addClass cls
#endif
%>
<div id="<%=@ctlID%>" class="<%arg:class%>">
<%
	firstDone = false
	for tab in @args.tabs
		%>
		<a href="javascript:void(0);" id="<%=@id(tab)%>" class="<%arg:tabClass%> <%=@args.tabClass + (if firstDone then '-inactive' else '-active')%>"><%=@res @args.resPrefix + tab%></a>
		<%
		if not firstDone
			firstDone = true
	%>
</div>

