###
Auto-generated from Core/Controls/Console.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Console extends smio.Control


	renderTemplate: =>
		div:
			id: ''
			class: "smio-console smio-console-#{if @args['topDown'] then 'top' else 'bottom'}"
			'div #ever .smio-console-ever':
				_: ['Zeh Header']
			'div #hover':
				_: ['Zeh Hovva']
			'div #detail':
				_: ['Zeh Details']
	
#if client
	onLoad: ($el) =>
		super()
		if not @args['topDown']
			$("##{@id 'detail'}").insertBefore("##{@id('ever')}")
			$("##{@id 'hover'}").insertBefore("##{@id('ever')}")
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_Console"

	classNamespace: ->
		"Core_Controls"