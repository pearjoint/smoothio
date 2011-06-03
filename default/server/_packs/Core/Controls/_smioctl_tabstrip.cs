###
Auto-generated from Core/Controls/tabstrip.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_tabstrip extends smio.Control

#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_tabstrip"
		@init()

	renderHtml: ($el) ->
		if not @_html
			parts = []
			parts.push "<div id=\""
			parts.push @ctlID
			parts.push "\" class=\""
			parts.push @renderTag "arg", "class", null
			parts.push "\">\n"
			firstDone = false
			for tab in @args['tabs']
				parts.push "\n\t\t<a href=\"#\" id=\""
				parts.push @id(tab)
				parts.push "\" class=\""
				parts.push @renderTag "arg", "tabClass", null
				parts.push if firstDone then '' else (' ' + @args['tabClass'] + '-active')
				parts.push "\">"
				parts.push @res @args['resPrefix'] + tab
				parts.push "</a>\n\t\t"
				if not firstDone
					firstDone = true
			parts.push "\n</div>\n\n"
			@_html = parts.join ''
		if $el
			$el.html @_html
		@_html
#endif
