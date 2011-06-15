#if client

renderTemplate: =>
	ret =
		a:
			id: ''
			class: @args.class or ''
			href: @args.href or smio.Control.util.jsVoid
	if (@disabled)
		ret.a.disabled = 'disabled'
	if @args.labelText or @args.labelHtml
		@jsonTemplates_Label(ret.a)
	ret

coreDisable: (disable) =>
	@el.prop('disabled', disable)

onLoad: =>
	super()
	@el.click =>
		if @args.onClick and not (@disabled or @el.prop('disabled'))
			@args.onClick()

#endif

