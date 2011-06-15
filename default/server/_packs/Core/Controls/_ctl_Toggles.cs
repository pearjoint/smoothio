###
Auto-generated from Core/Controls/Toggles.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Toggles extends smio.Control


	renderTemplate: ->
		span =
			id: ''
		if @args.items
			for itemID, item of @args.items
				while _.startsWith itemID, '#'
					itemID = itemID.substr 1
				if not item['toggleName']
					item.toggleName = @id 'toggle'
				if @args.type is 'bullets'
					item.checked = true
				if @args.disabled
					item.disabled = @args.disabled
				span["Toggle ##{itemID}"] =
					item
		span: span
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_Toggles"

	classNamespace: ->
		"Core_Controls"