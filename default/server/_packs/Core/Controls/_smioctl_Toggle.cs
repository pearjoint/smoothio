###
Auto-generated from Core/Controls/Toggle.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Toggle extends smio.Control


	renderTemplate: ->
		ret =
			span:
				class: 'smio-toggleinput'
				id: ''
		ret.span.input=
			id: 'input'
			name: @args.toggleName
			class: 'smio-toggleinput'
			disabled: 'disabled'
			type: if @args.type is 'checkbox' then 'checkbox' else 'radio'
		if @args.labelText
			ret.span.label =
				id: 'label'
				for: @id 'input'
				html: [@args.labelText]
		ret
	
	


	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_Toggle"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()