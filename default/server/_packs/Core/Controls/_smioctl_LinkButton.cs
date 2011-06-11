###
Auto-generated from Core/Controls/LinkButton.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_LinkButton extends smio.Control


#if client
	
	renderTemplate: ->
		ret =
			a:
				id: ''
				class: @args.class or ''
				href: @args.href or smio.Control.util.jsVoid
		if @args.labelText
			ret.a.text = [@args.labelText]
		ret
	
	onLoad: ->
		super()
		if @args.onClick
			@el.click @args.onClick
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_LinkButton"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()