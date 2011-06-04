###
Auto-generated from Core/Controls/SwipeBehavior.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_SwipeBehavior extends smio.Control


	onLoad: ->
		super()
		@el.addClass 'smio-swipebehavior'


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_SwipeBehavior"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()

	renderHtml: ($el) ->
		if not @_html
			__o = []
			__o.push "\n\n"
			@_html = __o.join ''
		if $el
			$el.html @_html
		@_html
#endif
