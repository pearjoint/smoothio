#if client

renderTemplate: =>
	'div .smio-invwarndetails':
		id: ''
		'div .smio-invwarndetails-edge':
			'div .smio-invwarndetails-arr':
				html: ['&nbsp;']
		'div .smio-invwarndetails-box':
			'div .smio-invwarndetails-inner':
				html: ['here are some error details for ya...<br/>foo whoar?<br/>foo whoar?<br/>foo whoar?<br/>foo whoar?']

#endif

