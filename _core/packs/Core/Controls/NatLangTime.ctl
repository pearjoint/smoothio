renderTemplate: =>
	"span .smio-dt":
		id: ''
		title: "#{@args.dt}"
		'data-dt': @args.dt.getTime()
		_: [smio.Util.DateTime.stringify(@args.dt)]

