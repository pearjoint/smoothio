renderTemplate: ->
	ret =
		span:
			class: 'smio-textinput'
			id: ''
	if @args.labelText
		ret.span.label =
			id: 'label'
			for: @id 'input'
			html: [@args.labelText]
	ret.span.input=
		id: 'input'
		class: 'smio-textinput'
		type: if @args.type is 'password' then 'password' else 'text'
	ret

