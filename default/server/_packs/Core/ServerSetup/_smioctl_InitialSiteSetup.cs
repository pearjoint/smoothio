###
Auto-generated from Core/ServerSetup/InitialSiteSetup.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_ServerSetup_InitialSiteSetup extends smio.Control

#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_ServerSetup", "Core_ServerSetup_InitialSiteSetup"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()

	renderHtml: ($el) ->
		if not @_html
			__o = []
			__o.push "<div class=\"smio-setup\" id=\""
			__o.push @id()
			__o.push "\">\n\t<div class=\"smio-setup-outer smio-setup-outer-top\">\n\t\t<div class=\"smio-setup-header\">"
			__o.push @renderTag "r", "title", null
			__o.push "</div>\n\t\t<div class=\"smio-setup-header-desc\">"
			__o.push @renderTag "r", "desc", null
			__o.push "</div>\n\t</div>\n\t<div class=\"smio-setup-inner\">\n\t\t<ul id=\""
			__o.push @id('stepswipe')
			__o.push "\">\n\t\t\t<li class=\"smio-setup-stepbox\">\n\t\t\t\t"
			__o.push @renderTag "r", "usersetup", null
			__o.push "\n\t\t\t</li>\n\t\t\t<li class=\"smio-setup-stepbox\">\n\t\t\t\t"
			__o.push @renderTag "r", "templateselection", null
			__o.push "\n\t\t\t</li>\n\t\t\t<li class=\"smio-setup-stepbox\">\n\t\t\t\tthe finish line!!\n\t\t\t\t<br/>\n\t\t\t\tthis is where we ROLL...\n\t\t\t\t<br/><br/>\n\t\t\t\tcrazy innit?!\n\t\t\t</li>\n\t\t</ul>\n\t\t"
			__o.push @renderTag "ctl", "SwipeBehavior", { id: @id('stepswipe') }
			__o.push "\n\t</div>\n\t"
			__o.push @renderTag "ctl", "TabStrip", { id: @id('steptabs'), class: 'smio-setup-outer smio-setup-steps', tabClass: 'smio-setup-step', tabs: ['owner', 'template', 'finish'], resPrefix: 'steps_' }
			__o.push "\n</div>\n\n"
			@_html = __o.join ''
		if $el
			$el.html @_html
		@_html
#endif
