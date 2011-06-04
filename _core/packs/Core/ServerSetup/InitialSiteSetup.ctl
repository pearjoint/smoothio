<div class="smio-setup" id="<%=@id()%>">
	<div class="smio-setup-outer smio-setup-outer-top">
		<div class="smio-setup-header"><%r:title%></div>
		<div class="smio-setup-header-desc"><%r:desc%></div>
	</div>
	<div class="smio-setup-inner">
		<%begin:Carousel { id: @id('carousel') } %>
			<%begin:item { id: 'owner' } %>
				<%r:usersetup%>
			<%end:%>
			<%begin:item { id: 'template' } %>
				<%r:templateselection%>
			<%end:%>
			<%begin:item { id: 'finish' } %>
				the finish line!!
				<br/>
				this is where we ROLL...
				<br/><br/>
				crazy innit?!
			<%end:%>
		<%end:%>
	</div>
	<%ctl:TabStrip { id: @id('steptabs'), class: 'smio-setup-outer smio-setup-steps', tabClass: 'smio-setup-step', tabs: ['owner', 'template', 'finish'], resPrefix: 'steps_' }%>
</div>

