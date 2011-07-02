renderTemplate: =>
	div = 'div':
		id: ''
		class: "#{@args.class}"
	for itemID, item of @args.items
		div.div["LinkButton ##{itemID} .#{@args.btnClass}"] = item
	div

