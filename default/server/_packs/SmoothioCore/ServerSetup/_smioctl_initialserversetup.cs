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
			parts.push "\">\n\t<div class=\"smio-setup-header\">Set up a new smoothio server:</div>\n\t<div class=\"smio-setup-header-desc\">Let us explain...</div>\n\t<div class=\"smio-setup-usersetup\">\n\t\tset up admin user...\n\t</div>\n\t<div class=\"smio-setup-templates\">\n\t\tselect template...\n\t</div>\n\t<div class=\"smio-setup-buttonarea\">\n\t\t<a disabled=\"disabled\" class=\"smio-setup-button\">Setup</a>\n\t</div>\n</div>\n"
			@_html = parts.join ''
		if $el
			$el.html @_html
		@_html
#endif
