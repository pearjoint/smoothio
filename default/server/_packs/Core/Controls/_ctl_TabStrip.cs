###
Auto-generated from Core/Controls/TabStrip.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_TabStrip extends smio.Control


#if client
	
	renderTemplate: =>
		ret =
			div:
				id: ''
				class: @args.class or ''
		makeOnClick = (tabID) =>
			=> @selectTab(tabID)
		is1st = true
		for tab in @args.tabs
			ret.div["LinkButton ##{tab} .#{@args.tabClass} .#{@args.tabClass + (if is1st then '-active' else '-inactive')}"] =
				labelText: @args.resPrefix + tab
				onClick: makeOnClick(tab)
			is1st = false
		ret
	
	selectTab: (tabID) =>
		a = @sub(tabID)
		cls = "#{@args.tabClass}-active"
		uncls = "#{@args.tabClass}-inactive"
		if not a.hasClass(cls)
			for t in @args.tabs
				@sub(t).removeClass(cls).addClass(uncls)
			a.removeClass(uncls).addClass(cls)
			if @args.onTabSelect
				@args.onTabSelect(tabID)
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_TabStrip"

	classNamespace: ->
		"Core_Controls"