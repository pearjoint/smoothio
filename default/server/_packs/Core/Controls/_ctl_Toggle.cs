###
Auto-generated from Core/Controls/Toggle.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Toggle extends smio.Control


#const $CC smio-toggleinput
	
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
			name: @args.name
			class: '$CC'
			type: if ischk then 'checkbox' else 'radio'
		if (@disabled)
			ret.span.span.span.input.disabled = 'disabled'
		if @args.style
			ret.span.style = ("#{n}: #{v}" for n, v of @args.style).join(';')
		if @args.checked
			ret.span.span.span.input.checked = 'checked'
			getGSpan()['span #glyph'].html = [smio[@classPath()][if ischk then 'checkmark' else 'radiomark']]
		if @jsonTemplates_HasLabel()
			ret.span.span.label =
				id: 'label'
				class: '$CC'
				for: @id('input')
			@jsonTemplates_Label(ret.span.span.label)
		ret
	
	commonCssClass: =>
		@args.name or @id()
	
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
			@sub('glyph').html(if not @chk then '' else smio[@classPath()][if @isCheckBox() then 'checkmark' else 'radiomark'])
			if @isRadioBox() and not passive
				$(".$CC-#{@commonCssClass()} input.$CC").each (i, e) =>
					if e.id isnt @id('input')
						$(e).prop('checked', false)
						if (ctl = @ctl(e.id.substr(0, e.id.lastIndexOf('_'))))
							ctl.onCheck(true)
			if @args.onCheck
				@args.onCheck(@chk)
			@on('check', [@chk])
	
	onLoad: =>
		super()
		(inp = @sub('input')).click (evt) =>
			@onCheck()
			if @isCheckBox()
				evt.stopPropagation()
		inp.blur =>
			@sub('btnlabel').removeClass('$CC-focused')
			@el.removeClass('$CC-hasfocused')
		inp.focus =>
			@sub('btnlabel').addClass('$CC-focused')
			@el.addClass('$CC-hasfocused')
		@sub('btnlabel').click =>
			el = @sub('input')
			if not el.prop('disabled')
				el.prop('checked', @isRadioBox() or not el.prop('checked'))
				@onCheck()
		@chk = inp.prop('checked')
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_Toggle"

	classNamespace: ->
		"Core_Controls"