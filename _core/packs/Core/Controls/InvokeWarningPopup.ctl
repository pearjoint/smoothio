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
				html: ['&times;']
			'div .$CC-inner':
				'div .$CC-intro':
					html: ['Last attempted <i>5 minutes ago</i>:']
				'div .$CC-msg':
					html: ['This server already contains a Hub. Try a complete reload (CTRL+R).']
				'LinkButtons #btns .$CC-btns .smio-bigbutton-strip':
					btnClass: 'smio-bigbutton'
					items:
						'retry':
							labelRawHtml: '<span class="smio-invbtn-icon smio-invbtn-retry">&#x27A5;</span> Neuer Versuch'
						'cancel':
							labelRawHtml: '<span class="smio-invbtn-icon smio-invbtn-cancel">&#x2718;</span> Abbrechen'

coreDisable: (disable) =>
	@sub('close').css(display: if disable then 'none' else 'inline-block').prop('disabled', disable)

onLoad: =>
	super()
	@sub('close').click =>
		if not (@disabled or @sub('close').prop('disabled'))
			@removeControl()

#endif

