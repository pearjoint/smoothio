###
Auto-generated from Core/Controls/Carousel.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Carousel extends smio.Control


	init: ->
		super()
		@ctlRenderers['item'] = (className, args) =>
			itemID = @id(args.id)
			content = @renderTag "inner", null, args
			"<li id=\"#{itemID}\">#{content}</li>"

	onLoad: ->
		super()
		@el[0].scrollLeft = 200


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_Carousel"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()

	renderHtml: ($el) ->
		if not @_html
			__r =
				ctls: []
				m: []
				o: null
			__r.o = __r.m
			__r.o.push "\n<div id=\""
			__r.o.push  @id() 
			__r.o.push "\" class=\"smio-carousel\">\n\t<ul id=\""
			__r.o.push  @id('ul') 
			__r.o.push "\" class=\"smio-carousel\">\n\t\t"
			__r.o.push @renderTag "inner", "", null
			__r.o.push "\n\t</ul>\n</div>\n\n"
			@_html = __r.o.join ''
		if $el
			$el.html @_html
		@_html
#endif
