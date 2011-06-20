###
Auto-generated from Core/Controls/Test.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Test extends smio.Control


	test: (xyz) =>
		arr = [1, 'a', 3]
		x = 'a'
		if (arr.indexOf(x) >= 0)
			alert(345)
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_Test"

	classNamespace: ->
		"Core_Controls"