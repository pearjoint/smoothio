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
			__r =
				ctls: []
				m: []
				o: null
			__r.o = __r.m
			__r.o.push "<div class=\"smio-setup\" id=\""
			__r.o.push @id()
			__r.o.push "\">\n\t<div class=\"smio-setup-outer smio-setup-outer-top\">\n\t\t<div class=\"smio-setup-header\">"
			__r.o.push @renderTag "r", "title", null
			__r.o.push "</div>\n\t\t<div class=\"smio-setup-header-desc\">"
			__r.o.push @renderTag "r", "desc", null
			__r.o.push "</div>\n\t</div>\n\t<div class=\"smio-setup-inner\">\n\t\t"
			tmp = []
			__r.ctls.push o: tmp, c: "Carousel", args: { id: @id('carousel') } 
			__r.o = tmp
			__r.o.push "\n\t\t\t"
			tmp = []
			__r.ctls.push o: tmp, c: "item", args: { id: 'owner' } 
			__r.o = tmp
			__r.o.push "\n\t\t\t\t"
			__r.o.push t: "r", s: "usersetup", a: null
			__r.o.push "\n\t\t\t"
			tmp = __r.ctls.pop()
			__r.o = __r.ctls[0].o
			__r.o.push t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)
			__r.o.push "\n\t\t\t"
			tmp = []
			__r.ctls.push o: tmp, c: "item", args: { id: 'template' } 
			__r.o = tmp
			__r.o.push "\n\t\t\t\t"
			__r.o.push t: "r", s: "templateselection", a: null
			__r.o.push "\n\t\t\t"
			tmp = __r.ctls.pop()
			__r.o = __r.ctls[0].o
			__r.o.push t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)
			__r.o.push "\n\t\t\t"
			tmp = []
			__r.ctls.push o: tmp, c: "item", args: { id: 'finish' } 
			__r.o = tmp
			__r.o.push "\n\t\t\t\tthe finish line!!\n\t\t\t\t<br/>\n\t\t\t\tthis is where we ROLL...\n\t\t\t\t<br/><br/>\n\t\t\t\tcrazy innit?!\n\t\t\t"
			tmp = __r.ctls.pop()
			__r.o = __r.ctls[0].o
			__r.o.push t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)
			__r.o.push "\n\t\t"
			tmp = __r.ctls.pop()
			__r.o = __r.m
			__r.o.push @renderTag 'ctl', tmp.c, smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o
			__r.o.push "\n\t</div>\n\t"
			__r.o.push @renderTag "ctl", "TabStrip", { id: @id('steptabs'), class: 'smio-setup-outer smio-setup-steps', tabClass: 'smio-setup-step', tabs: ['owner', 'template', 'finish'], resPrefix: 'steps_' }
			__r.o.push "\n</div>\n\n"
			@_html = __r.o.join ''
		if $el
			$el.html @_html
		@_html
#endif
