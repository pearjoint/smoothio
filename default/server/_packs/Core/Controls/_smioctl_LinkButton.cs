###
Auto-generated from Core/Controls/LinkButton.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_LinkButton extends smio.Control


#if client
	
	renderTemplate: ->
		a:
			id: ''
			class: @args.class or ''
			href: @args.href or 'javascript:void(0);'
			_: [@args.label]
	
#endif
	
	


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_LinkButton"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()