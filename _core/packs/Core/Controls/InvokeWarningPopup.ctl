#if client

renderTemplate: =>
	'div .smio-invwarndetails .smio-fade':
		id: ''
		'div .smio-invwarndetails-edge':
			'div .smio-invwarndetails-arr':
				html: ['&nbsp;']
		'div .smio-invwarndetails-box':
			'div .smio-invwarndetails-inner':
				html: ['Last attempted <i>5 minutes ago</i>:<br/><br/><b>This server already contains a Hub. Try a complete reload (CTRL+R).</b><br/><br/>Retry or Cancel']

#endif

