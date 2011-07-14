renderTemplate: =>
	div:
		id: ''
		class: "smio-console smio-console-#{if @args['topDown'] then 'top' else 'bottom'}"
		'div #ever .smio-console-ever':
			_: ['Zeh Header']
		'div #hover':
			_: ['Zeh Hovva']
		'div #detail':
			_: ['Zeh Details']

#if client
onLoad: ($el) =>
	super()
	if not @args['topDown']
		$("##{@id 'detail'}").insertBefore("##{@id('ever')}")
		$("##{@id 'hover'}").insertBefore("##{@id('ever')}")
#endif

