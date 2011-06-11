#if client

renderTemplate: ->
	ret =
		a:
			id: ''
			class: @args.class or ''
			href: @args.href or smio.Control.util.jsVoid
	if @args.labelText
		ret.a.text = [@args.labelText]
	ret

onLoad: ->
	super()
	if @args.onClick
		@el.click @args.onClick

#endif

