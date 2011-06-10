renderTemplate: ->
	ret =
		span:
			class: 'smio-toggleinput'
			id: ''
	ret.span.input=
		id: 'input'
		name: @args.toggleName
		class: 'smio-toggleinput'
		disabled: 'disabled'
		type: if @args.type is 'checkbox' then 'checkbox' else 'radio'
	if @args.labelText
		ret.span.label =
			id: 'label'
			for: @id 'input'
			html: [@args.labelText]
	ret

