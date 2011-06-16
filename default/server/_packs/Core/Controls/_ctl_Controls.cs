###
Auto-generated from Core/Controls/Controls.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Controls extends smio.Control


	renderTemplate: =>
		nocopy = ['ctltype', 'items', 'id', 'class']
		span =
			id: ''
		if @args.items
			if _.isArray(@args.items)
				items = {}
				for it in @args.items
					items[it] = {}
			else
				items = @args.items
			for itemID, item of items
				while _.startsWith(itemID, '#')
					itemID = itemID.substr(1)
				for an, av of @args
					if (not (an in nocopy)) and (not item[an]?)
						item[an] = if _.isFunction(av) then av(itemID) else av
				span["#{@args.ctltype} ##{itemID}"] =
					item
		span: span
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_Controls"

	classNamespace: ->
		"Core_Controls"