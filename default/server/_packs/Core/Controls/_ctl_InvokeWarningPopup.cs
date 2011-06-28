###
Auto-generated from Core/Controls/InvokeWarningPopup.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_InvokeWarningPopup extends smio.Control


#if client
	
	renderTemplate: =>
		"div .smio-invwarndetails":
			html: ['here are some error details for ya']
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_InvokeWarningPopup"

	classNamespace: ->
		"Core_Controls"