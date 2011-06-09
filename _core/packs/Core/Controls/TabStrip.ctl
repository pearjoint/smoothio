#if client

renderTemplate: ->
	ret =
		div:
			id: ''
			class: @args.class or ''
	makeOnClick = (tabID) => => @selectTab tabID
	is1st = true
	for tab in @args.tabs
		ret.div["LinkButton ##{tab} .#{@args.tabClass} .#{@args.tabClass + (if is1st then '-active' else '-inactive')}"] =
			label: [@r @args.resPrefix + tab]
			onClick: makeOnClick tab
		is1st = false
	ret

selectTab: (tabID) ->
	a = $("##{@id tabID}")
	cls = "#{@args.tabClass}-active"
	incls = "#{@args.tabClass}-inactive"
	if not a.hasClass cls
		for t in @args.tabs
			$("##{@id t}").removeClass(cls).addClass incls
		a.removeClass(incls).addClass cls
		if @args.onTabSelect
			@args.onTabSelect tabID

#endif

