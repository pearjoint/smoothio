#const $CC smio-textinput

renderTemplate: =>
	ret =
		span:
			class: '$CC'
			id: ''
	if @args.labelText or @args.labelHtml
		ret.span.label =
			id: 'label'
			for: @id('input')
		@jsonTemplates_Label(ret.span.label)
	ret.span.input=
		id: 'input'
		class: '$CC'
		type: if @args.type is 'password' then 'password' else 'text'
	if (@disabled)
		ret.span.input.readonly = 'readonly'
	if @args.autoFocus
		ret.span.input.autofocus = 'autofocus'
	if @args.required
		ret.span.input.required = 'required'
	if @args.placeholder
		ret.span.input.placeholder = @r(@args.placeholder)
	if @args.value
		ret.span.input.value = @args.value
	if @args.nospellcheck
		ret.span.input.spellcheck = false
	ret

coreDisable: (disable) =>
	@sub('input').prop('readonly', disable)

onLoad: =>
	if @args.onChange
		@sub('input').change => @args.onChange(@sub('input'))

