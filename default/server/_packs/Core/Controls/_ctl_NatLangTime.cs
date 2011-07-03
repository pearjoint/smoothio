###
Auto-generated from Core/Controls/NatLangTime.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_NatLangTime extends smio.Control


	renderTemplate: =>
		"span .smio-dt":
			id: ''
			title: "#{@args.dt}"
			'data-dt': @args.dt.getTime()
			_: [smio.Util.DateTime.stringify(@args.dt)]
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_NatLangTime"

	classNamespace: ->
		"Core_Controls"