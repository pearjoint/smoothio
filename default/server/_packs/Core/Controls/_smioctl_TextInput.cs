###
Auto-generated from Core/Controls/TextInput.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_TextInput extends smio.Control


	renderTemplate: ->
		ret =
			span:
				class: 'smio-textinput'
				id: ''
		if @args.labelText
			ret.span.label =
				id: 'label'
				for: @id 'input'
				html: [@args.labelText]
		ret.span.input=
			id: 'input'
			class: 'smio-textinput'
			type: if @args.type is 'password' then 'password' else 'text'
		if (@disabled)
			ret.span.input.readonly = 'readonly'
		if @args.value
			ret.span.input.value = @args.value
		if @args.nospellcheck
			ret.span.input.spellcheck = false
		ret
	
	coreDisable: (disable) ->
		@sub('input').prop 'readonly', disable
	
	


	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_TextInput"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()