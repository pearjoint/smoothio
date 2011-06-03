###
Auto-generated from Core/ServerSetup/initialserversetup.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_ServerSetup_initialserversetup extends smio.Control

#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_ServerSetup", "Core_ServerSetup_initialserversetup"
		@init()

	renderHtml: ($el) ->
		if not @_html
			parts = []
			parts.push "<div class=\"smio-setup\" id=\""
			parts.push @id()
			parts.push "\">\n\t<div class=\"smio-setup-outer\">\n\t\t<div class=\"smio-setup-header\">"
			parts.push @renderTag "r", "title", null
			parts.push "</div>\n\t\t<div class=\"smio-setup-header-desc\">"
			parts.push @renderTag "r", "desc", null
			parts.push "</div>\n\t</div>\n\t<div class=\"smio-setup-inner\">\n\t\t<div class=\"smio-setup-usersetup\">\n\t\t\t"
			parts.push @renderTag "r", "usersetup", null
			parts.push "\n\t\t</div>\n\t\t<div class=\"smio-setup-templates\">\n\t\t\t"
			parts.push @renderTag "r", "templateselection", null
			parts.push "\n\t\t</div>\n\t</div>\n\t"
			parts.push @renderTag "ctl", "tabstrip", { id: @id('steptabs'), class: 'smio-setup-outer smio-setup-steps', tabClass: 'smio-setup-step', tabs: ['owner', 'template', 'finish'], resPrefix: 'steps_' }
			parts.push "\n</div>\n\n"
			@_html = parts.join ''
		if $el
			$el.html @_html
		@_html
#endif
