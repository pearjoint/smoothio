###
Auto-generated from Core/Controls/LinkButton.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_LinkButton extends smio.Control


#if client
	
	renderTemplate: =>
		ret =
			a:
				id: ''
				class: @args.class or ''
				href: @args.href or smio.Control.util.jsVoid
		if @args.invoke
			ret.a['span #inv .smio-inv'] = html: [@args.invoke.html + '']
			ret.a['span .smio'] = html: ['&nbsp;']
		ret.a.span = {}
		@jsonTemplates_Label(ret.a.span)
		if (@disabled)
			ret.a.disabled = 'disabled'
		ret
	
	coreDisable: (disable) =>
		@el.prop('disabled', disable)
	
	onLoad: =>
		super()
		@el.click =>
			if not (@disabled or @el.prop('disabled'))
				if @args.onClick
					@args.onClick()
				if @args.invoke
					for n, v of @args.invoke
						if (n isnt 'html') and (n isnt 'onResult')
							@invoke(n, if _.isFunction(v) then v() else v)
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_LinkButton"

	classNamespace: ->
		"Core_Controls"