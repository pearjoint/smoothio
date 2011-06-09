###
Auto-generated from Core/Controls/TextInput.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_TextInput extends smio.Control


#if client
	
	renderTemplate: ->
		ret =
			span:
				id: ''
				input:
					type: 'text'
		ret
	
#endif
	
	


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_TextInput"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()