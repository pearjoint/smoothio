###
Auto-generated from Core/Controls/TabStrip.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_TabStrip extends smio.Control


#if client
	
	renderTemplate: ->
		ret =
			div:
				id: ''
				class: @args.class or ''
		is1st = true
		for tab in @args.tabs
			ret.div["LinkButton ##{tab} .#{@args.tabClass} .#{@args.tabClass + (if is1st then '-active' else '-inactive')}"] = label: [@r @args.resPrefix + tab]
			is1st = false
		ret
	
	onLoad: ->
		super()
		for t in @args.tabs
			makeHandler = (tabID) =>
				() => @selectTab tabID
			$("##{@id t}").click makeHandler t
	
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
	
	


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_TabStrip"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()