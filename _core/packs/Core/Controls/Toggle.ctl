#if client

renderTemplate: ->
	span:
		id: ''
		input:
			id: 'input'
		label:
			id: 'label'
			for: @id 'input'
			text: [@args.label or '']

#endif

