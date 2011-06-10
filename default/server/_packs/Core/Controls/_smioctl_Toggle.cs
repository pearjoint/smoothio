###
Auto-generated from Core/Controls/Toggle.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Toggle extends smio.Control


#if client
	
	renderTemplate: ->
		span:
			id: ''
			input:
				id: 'input'
			label:
				id: 'label'
				for: @id 'input'
				text: [@args.label or '']
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_Toggle"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()