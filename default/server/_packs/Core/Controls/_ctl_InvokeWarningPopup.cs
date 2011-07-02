###
Auto-generated from Core/Controls/InvokeWarningPopup.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_InvokeWarningPopup extends smio.Control


#const $CC smio-invwarn
	
#if client
	
	renderTemplate: =>
		'div .$CC .smio-fade':
			id: ''
			'div .$CC-edge':
				'div .$CC-arr':
					html: ['&nbsp;']
			'div .$CC-box':
				'a #close .$CC-close':
					href: smio.Control.util.jsVoid
					title: @r 'close'
					html: ['&times;']
				'div .$CC-inner':
					'div .$CC-intro':
						html: [@r('invwarn_lasttried', @args.invCtl.invtime.getTime(), JSON.stringify(@args.invCtl.invtime))]
					'div .$CC-msg':
						html: ['This server already contains a Hub. Try a complete reload (CTRL+R).']
					'LinkButtons #btns .$CC-btns .smio-bigbutton-strip':
						btnClass: 'smio-bigbutton'
						items:
							'retry':
								labelRawHtml: "<span class=\"smio-invbtn-icon smio-invbtn-retry\">&#x27A5;</span> #{@r 'invwarn_retry'}"
								onClick: =>
									if @args.invCtl and @args.invCtl.el and not @isDisabled()
										@args.invCtl.el.click()
							'cancel':
								labelRawHtml: "<span class=\"smio-invbtn-icon smio-invbtn-cancel\">&#x2718;</span> #{@r 'invwarn_cancel'}"
								onClick: =>
									if @args.invCtl and not @isDisabled()
										@args.invCtl.resetInvoke()
	
	coreDisable: (disable) =>
		@sub('close').css(display: if disable then 'none' else 'inline-block').prop('disabled', disable)
	
	isDisabled: =>
		@disabled or @sub('close').prop('disabled')
	
	onLoad: =>
		super()
		@sub('close').click =>
			if not @isDisabled()
				@removeControl()
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_InvokeWarningPopup"

	classNamespace: ->
		"Core_Controls"