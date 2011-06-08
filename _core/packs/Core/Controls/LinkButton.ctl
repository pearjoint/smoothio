#if client

renderTemplate: ->
	a:
		id: ''
		class: @args.class or ''
		href: @args.href or 'javascript:void(0);'
		_: [@args.label]

onLoad: ->
	super()
	if @args.onClick
		@el.click @args.onClick

#endif

