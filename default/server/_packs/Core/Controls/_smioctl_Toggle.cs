###
Auto-generated from Core/Controls/Toggle.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Toggle extends smio.Control


	@checkmark: '&#x2714;'
	@radiomark: ''
	
	renderTemplate: ->
		ischk = @isCheckBox()
		ret =
			span:
				class: "smio-toggleinput smio-toggleinput-#{smio.iif ischk, 'checkbox', 'radio'} smio-toggleinput-#{smio.iif @args.checked, '', 'un'}checked smio-toggleinput-#{@getSharedClass()}"
				id: ''
				span:
					id: 'btnlabel'
					class: "smio-toggleinput-btnlabel"
					span:
						id: 'btn'
						class: 'smio-toggleinput-btn'
						span:
							id: 'btnglyph'
							class: 'smio-toggleinput-btnbtn'
		if ischk
			ret.span.span.span['span #glyph'] = class: 'smio-toggleinput-btnglyph'
		else
			ret.span.span.span.span['span #glyph'] = class: 'smio-toggleinput-btnglyph'
		ret.span.span.span.input =
			id: 'input'
			name: @args.toggleName
			class: 'smio-toggleinput'
			type: smio.iif ischk, 'checkbox', 'radio'
		if @args.checked
			ret.span.span.span.input.checked = 'checked'
			(smio.iif ischk, ret.span.span.span, ret.span.span.span.span)['span #glyph'].html = [@cls()[smio.iif ischk, 'checkmark', 'radiomark']]
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
	
	onCheck: (passive) ->
		if @val isnt @elInput.prop 'checked'
			@val = @elInput.prop 'checked'
			nuCls = smio.iif @val, 'smio-toggleinput-checked', 'smio-toggleinput-unchecked'
			unCls = smio.iif @val, 'smio-toggleinput-unchecked', 'smio-toggleinput-checked'
			@el.removeClass(unCls).addClass nuCls
			$("##{@id 'glyph'}").html smio.iif @val, @cls()[smio.iif @isCheckBox(), 'checkmark', 'radiomark'], ''
			if @isRadioBox() and not passive
				$(".smio-toggleinput-#{@getSharedClass()} input.smio-toggleinput").each (i, e) =>
					if e.id isnt @id 'input'
						$(e).prop 'checked', false
						if (ctl = @client.allControls[e.id.substr 0, e.id.lastIndexOf '_'])
							ctl.onCheck true
	
	onLoad: ->
		super()
		(@elInput = $ "##{@id 'input'}").click (evt) =>
			@onCheck()
			if @isCheckBox()
				evt.stopPropagation()
		@elInput.blur =>
			$("##{@id 'btnlabel'}").removeClass 'smio-toggleinput-focused'
		@elInput.focus =>
			$("##{@id 'btnlabel'}").addClass 'smio-toggleinput-focused'
		$("##{@id 'btn'}").click =>
			@elInput.prop 'checked', @isRadioBox() or not @elInput.prop 'checked'
			@onCheck()
		@val = @elInput.prop 'checked'
	
	


	constructor: (client, parent, args) ->
		super client, parent, args, "Core_Controls", "Core_Controls_Toggle"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()