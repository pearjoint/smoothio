<div class="smio-setup" id="<%=@id()%>">
	<div class="smio-setup-outer">
		<div class="smio-setup-header"><%r:title%></div>
		<div class="smio-setup-header-desc"><%r:desc%></div>
	</div>
	<div class="smio-setup-inner">
		<div class="smio-setup-usersetup">
			<%r:usersetup%>
		</div>
		<div class="smio-setup-templates">
			<%r:templateselection%>
		</div>
	</div>
	<%ctl:tabstrip { id: @id('steptabs'), class: 'smio-setup-outer smio-setup-steps', tabClass: 'smio-setup-step', tabs: ['owner', 'template', 'finish'], resPrefix: 'steps_' }%>
</div>

