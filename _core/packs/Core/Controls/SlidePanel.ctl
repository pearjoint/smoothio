#const $CC smio-slidepanel

#if client

renderTemplate: =>
	ul =
		class: "$CC #{@args.class or ''}"
		'li #libefore':
			html: ['&nbsp;']
	if @args.items
		for itemID, item of @args.items
			while _.startsWith(itemID, '#')
				itemID = itemID.substr(1)
			@items.push(itemID)
			ul["li #items_#{itemID} .#{@args.itemClass or ''}"] = item
	ul['li #liafter'] =
		html: ['&nbsp;']
	div:
		id: ''
		class: "$CC #{@args.class}"
		'div #scrollbox .$CC-scrollbox':
			'ul #items': ul
		'div #edgeprev .$CC-edge .$CC-edge-left':
			'div .$CC-edge-arr .x9668': _: [@r 'slidepanel_prev']
		'div #edgenext .$CC-edge .$CC-edge-right':
			'div .$CC-edge-arr .x9658': _: [@r 'slidepanel_next']

init: =>
	@curItem = 0
	@items = []
	@scrolling = false
	super()
	if @args.onItemSelect and _.isFunction(@args.onItemSelect)
		@on 'itemSelect', @args.onItemSelect

onLoad: =>
	super()
	@sub('edgeprev').click => @scrollTo(@curItem - 1)
	@sub('edgenext').click => @scrollTo(@curItem + 1)
	@sub('scrollbox').scroll _.debounce((=> @scrollTo(null, true) if not @scrolling), 100)
	@scrollTo(0, true)

onWindowResize: (w, h) =>
	@scrollTo(@curItem, true)

scrollTo: (item, force) =>
	[edgePrev, edgeNext, scrollBox, bounce] = [@sub('edgeprev'), @sub('edgenext'), @sub('scrollbox'), true]
	curPos = scrollBox.scrollLeft()
	if item is null
		bounce = false
		scrollLefts = []
		distances = []
		for it, i in @items
			scrollLefts.push(tmp = (curPos + @sub('items_' + it).position().left - edgePrev.width()))
			distances.push(Math.abs(tmp - curPos))
		item = distances.indexOf(Math.min(distances...))
	if _.isString(item)
		item = @items.indexOf(item)
	if ((item < 0) or (item >= @items.length)) and force
		item = 0
	onDone = =>
		@scrolling = false
		if bounce
			@scrollTo(null, true)
	if (force or item isnt @curItem) and (item >= 0) and (item < @items.length)
		@scrolling = true
		edgePrev.css(display: if (item is 0) then 'none' else 'block')
		edgeNext.css(display: if (item is (@items.length - 1)) then 'none' else 'block')
		@on('itemSelect', [@curItem = item, @items[item]])
		goalPos = curPos + @sub('items_' + @items[item]).position().left - edgePrev.width()
		rnd = smio.Util.Number.randomInt(48) + 48
		morpheus.tween(200, ((pos) => scrollBox.scrollLeft(pos)), onDone, null, curPos, (if bounce then (if (goalPos < curPos) then -rnd else rnd) else 0) + goalPos)

#endif

