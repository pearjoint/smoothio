#const $CC = smio-toggleinput

@checkmark: '&#x2714;'
@radiomark: ''

renderTemplate: =>
	ischk = @isCheckBox()
	ret =
		span:
			class: "$CC $CC-#{if ischk then 'checkbox' else 'radio'} $CC-#{if @args.checked then '' else 'un'}checked $CC-#{@commonCssClass()}"
			id: ''
			span:
				id: 'btnlabel'
				class: "$CC-btnlabel"
				span:
					id: 'btn'
					class: '$CC-btn'
					span:
						id: 'btnglyph'
						class: '$CC-btnbtn'
	getGSpan = -> if ischk then ret.span.span.span else ret.span.span.span.span
	getGSpan()['span #glyph'] = class: '$CC-btnglyph'
	ret.span.span.span.input =
		id: 'input'
		name: @args.toggleName
		class: '$CC'
		type: if ischk then 'checkbox' else 'radio'
	if (@disabled)
		ret.span.span.span.input.disabled = 'disabled'
	if @args.checked
		ret.span.span.span.input.checked = 'checked'
		getGSpan()['span #glyph'].html = [@@[if ischk then 'checkmark' else 'radiomark']]
	if @args.labelText or @args.labelHtml
		ret.span.span.label =
			id: 'label'
			class: '$CC'
			for: @id('input')
		@jsonTemplates_Label(ret.span.span.label)
	ret

commonCssClass: =>
	@args.toggleName or @id()

coreDisable: (disable) =>
	@sub('input').prop('disabled', disable)

isCheckBox: =>
	 @args.type is 'checkbox'

isRadioBox: =>
	 @args.type isnt 'checkbox'

onCheck: (passive) =>
	[cc, el] = ['$CC', @sub('input')]
	if @chk isnt el.prop('checked')
		@chk = el.prop('checked')
		nuCls = cc + (if @chk then '-checked' else '-unchecked')
		unCls = cc + (if @chk then '-unchecked' else '-checked')
		@el.removeClass(unCls).addClass(nuCls)
		@sub('glyph').html(if not @chk then '' else @@[if @isCheckBox() then 'checkmark' else 'radiomark'])
		if @isRadioBox() and not passive
			$(".$CC-#{@commonCssClass()} input.$CC").each (i, e) =>
				if e.id isnt @id('input')
					$(e).prop('checked', false)
					if (ctl = @client.allControls[e.id.substr(0, e.id.lastIndexOf('_'))])
						ctl.onCheck(true)

onLoad: =>
	super()
	(inp = @sub('input')).click (evt) =>
		@onCheck()
		if @isCheckBox()
			evt.stopPropagation()
	inp.blur =>
		@sub('btnlabel').removeClass('$CC-focused')
	inp.focus =>
		@sub('btnlabel').addClass('$CC-focused')
	@sub('btn').click =>
		el = @sub('input')
		if not el.prop('disabled')
			el.prop('checked', @isRadioBox() or not el.prop('checked'))
			@onCheck()
	@chk = inp.prop('checked')

