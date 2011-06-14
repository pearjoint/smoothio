renderTemplate: ->
	span =
		id: ''
	if @args.items
		for itemID, item of @args.items
			while _.startsWith itemID, '#'
				itemID = itemID.substr 1
			if not item['toggleName']
				item.toggleName = @id 'toggle'
			if @args.type is 'bullets'
				item.checked = true
			if @args.disabled
				item.disabled = @args.disabled
			span["Toggle ##{itemID}"] =
				item
	span: span

