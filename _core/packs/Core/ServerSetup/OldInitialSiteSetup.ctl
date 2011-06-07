<%script:
	onSlide: (index, itemID) ->
		@controls.steptabs.selectTab itemID

	onTabSelect: (tabID) ->
		@controls.stepslide.scrollTo tabID
%>
<div class="smio-setup" id="<%=@id()%>">
	<div class="smio-setup-outer smio-setup-outer-top">
		<div class="smio-setup-header"><%r:title%></div>
		<div class="smio-setup-header-desc"><%r:desc%></div>
	</div>
	<div class="smio-setup-inner">
		<%begin:SlidePanel { id: 'stepslide', class: 'smio-setup-stepslide', itemClass: 'smio-setup-stepbox', onItemSelect: (i, id) => @onSlide i, id } %>
			<%begin:item { id: 'owner' } %>
				<div class="smio-setup-stepbox-title"><%r:steptitle_owner%></div>
				<div class="smio-setup-stepbox-form">
					blaa
					<br/><br/>
					foo
					<br/><br/>
					yeah right
				</div>
			<%end:%>
			<%begin:item { id: 'template' } %>
				<div class="smio-setup-stepbox-title"><%r:steptitle_template%></div>
				<div class="smio-setup-stepbox-form">
					blaa
					<br/><br/>
					foo
					<br/><br/>
					yeah right
				</div>
			<%end:%>
			<%begin:item { id: 'finish' } %>
				<div class="smio-setup-stepbox-title"><%r:steptitle_finish%></div>
				<div class="smio-setup-stepbox-form">
					the finish line!!
					<br/>
					this is where we ROLL...
					<br/><br/>
					crazy innit?!
				</div>
			<%end:%>
		<%end:%>
	</div>
	<%ctl:TabStrip { id: 'steptabs', class: 'smio-setup-outer smio-setup-steptabs', tabClass: 'smio-setup-steptab', tabs: ['owner', 'template', 'finish'], resPrefix: 'steps_', onTabSelect: (tabID) => @onTabSelect tabID }%>
</div>

