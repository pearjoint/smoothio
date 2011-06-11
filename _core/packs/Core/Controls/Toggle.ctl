renderTemplate: ->
	ischk = @isCheckBox()
	ret =
		span:
			class: "smio-toggleinput smio-toggleinput-#{smio.iif ischk, 'checkbox', 'radio'} smio-toggleinput-#{smio.iif @args.checked, '', 'un'}checked smio-toggleinput-#{@getSharedClass()}"
			id: ''
			span:
				class: "smio-toggleinput-btnlabel"
				span:
					id: 'btn'
					class: 'smio-toggleinput-btn'
					span:
						id: 'btnglyph'
						class: 'smio-toggleinput-btnbtn'
						span:
							id: 'glyph'
							class: 'smio-toggleinput-btnglyph'
	ret.span.span.span.input =
		id: 'input'
		name: @args.toggleName
		class: 'smio-toggleinput'
		type: smio.iif ischk, 'checkbox', 'radio'
	if @args.checked
		ret.span.span.span.input.checked = 'checked'
		ret.span.span.span.span.span.html = ['&#x2714;']
	if @args.labelText or @args.labelHtml
		ret.span.span.label =
			id: 'label'
			class: 'smio-toggleinput'
			for: @id 'input'
		ret.span.span.label[smio.iif @args.labelHtml, 'html', 'text'] = [smio.iif @args.labelHtml, @args.labelHtml, @args.labelText]
	ret

getSharedClass: ->
	"#{@parent.id()}_#{@args.toggleName or ''}"

isCheckBox: ->
	 @args.type is 'checkbox'

isRadioBox: ->
	 @args.type isnt 'checkbox'

onBlur: ->

onCheck: (passive) ->
	if @val isnt @elInput.prop 'checked'
		@val = @elInput.prop 'checked'
		nuCls = smio.iif @val, 'smio-toggleinput-checked', 'smio-toggleinput-unchecked'
		unCls = smio.iif @val, 'smio-toggleinput-unchecked', 'smio-toggleinput-checked'
		@el.removeClass(unCls).addClass nuCls
		$("##{@id 'glyph'}").html smio.iif @val, '&#x2714;', ''
		if not passive
			$(".smio-toggleinput-#{@getSharedClass()} input.smio-toggleinput").each (i, e) =>
				if e.id isnt @id 'input'
					$(e).prop 'checked', false
					if (ctl = @client.allControls[e.id.substr 0, e.id.lastIndexOf '_'])
						ctl.onCheck true

onFocus: ->

onLoad: ->
	super()
	(@elInput = $ "##{@id 'input'}").click => @onCheck()
	$("##{@id 'btn'}").click =>
		@elInput.prop 'checked', true
		@onCheck()
	@val = @elInput.prop 'checked'

