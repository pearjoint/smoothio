#const $CC smio-invwarn

#if client

renderTemplate: =>
	noQuote = _.any(@args.errs, (e) -> e is smio.resources.client.timeout)
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
					'span .__1':
						html: [@r 'invwarn_lasttried1']
					'NatLangTime #dt':
						dt: @args.invCtl.invtime
					'span .__2':
						html: [@r 'invwarn_lasttried2']
				'div .$CC-msg': smio.Util.Array.toObject(@args.errs, ((v, i) -> "div .$CC-msg-#{if noQuote then 'noquote' else 'quote'} .__#{i}"), ((v) -> html: [v]))
				'LinkButtons #btns .$CC-btns .smio-bigbutton-strip':
					btnClass: 'smio-bigbutton'
					items:
						'retry':
							labelRawHtml: "<span class=\"smio-invbtn-icon smio-invbtn-retry smio-picon\">1</span> #{@r 'invwarn_retry'}"
							onClick: =>
								if @args.invCtl and @args.invCtl.el and not @isDisabled()
									@args.invCtl.el.click()
						'cancel':
							labelRawHtml: "<span class=\"smio-invbtn-icon smio-invbtn-cancel smio-picon\">D</span> #{@r 'invwarn_cancel'}"
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

