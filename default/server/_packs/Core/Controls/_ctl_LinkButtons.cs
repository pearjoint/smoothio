###
Auto-generated from Core/Controls/LinkButtons.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_LinkButtons extends smio.Control


	renderTemplate: =>
		div = 'div':
			id: ''
			class: "#{@args.class}"
		for itemID, item of @args.items
			div.div["LinkButton ##{itemID} .#{@args.btnClass}"] = item
		div
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_LinkButtons"

	classNamespace: ->
		"Core_Controls"