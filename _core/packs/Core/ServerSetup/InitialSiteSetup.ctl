<div class="smio-setup" id="<%=@id()%>">
	<div class="smio-setup-outer smio-setup-outer-top">
		<div class="smio-setup-header"><%r:title%></div>
		<div class="smio-setup-header-desc"><%r:desc%></div>
	</div>
	<div class="smio-setup-inner">
		<ul id="<%=@id('stepswipe')%>">
			<li class="smio-setup-stepbox">
				<%r:usersetup%>
			</li>
			<li class="smio-setup-stepbox">
				<%r:templateselection%>
			</li>
			<li class="smio-setup-stepbox">
				the finish line!!
				<br/>
				this is where we ROLL...
				<br/><br/>
				crazy innit?!
			</li>
		</ul>
		<%ctl:SwipeBehavior { id: @id('stepswipe') }%>
	</div>
	<%ctl:TabStrip { id: @id('steptabs'), class: 'smio-setup-outer smio-setup-steps', tabClass: 'smio-setup-step', tabs: ['owner', 'template', 'finish'], resPrefix: 'steps_' }%>
</div>

