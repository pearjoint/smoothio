###
Auto-generated from Core/Controls/MainFrame.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_MainFrame extends smio.Control


	renderTemplate: =>
		'div .smio-main':
			id: ''
			'Console #ctop':
				topDown: true
			'div .smio-console .smio-console-main':
				_: ['']
			'Console #cbottom':
				topDown: false
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_MainFrame"

	classNamespace: ->
		"Core_Controls"