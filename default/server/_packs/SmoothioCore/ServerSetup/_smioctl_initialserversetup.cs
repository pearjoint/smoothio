###
Auto-generated from SmoothioCore/ServerSetup/initialserversetup.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_SmoothioCore_ServerSetup_initialserversetup extends smio.Control

#if client
	constructor: (client, args) ->
		super client, args, "SmoothioCore_ServerSetup", "SmoothioCore_ServerSetup_initialserversetup"
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
			parts.push "\n\t\t</div>\n\t</div>\n\t<div class=\"smio-setup-outer\">\n\t\t<div class=\"smio-setup-buttonarea\">\n\t\t\t<a disabled=\"disabled\" class=\"smio-setup-button\">"
			parts.push @renderTag "r", "button", null
			parts.push "</a>\n\t\t</div>\n\t</div>\n</div>\n\n"
			@_html = parts.join ''
		if $el
			$el.html @_html
		@_html
#endif
