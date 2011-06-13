#if server

renderTemplate: ->
	"div .smio-setup":
		"id": ''
		"div .smio-setup-outer .smio-setup-outer-top":
			"div.smio-setup-header": [@r 'nojs_title']
			"div.smio-setup-header-desc": [@r 'nojs_desc']

#endif

#if client

renderTemplate: ->
	urlseg = _.trim (@client.pageUrl.attr 'directory'), '/'
	urlseg = smio.iif urlseg, "/#{urlseg}/", '/'
	"div .smio-setup":
		"id": ''
		"div .smio-setup-outer .smio-setup-outer-top":
			"div.smio-setup-header":
				html: [@r 'title', urlseg]
			"div.smio-setup-header-desc": [@r 'desc']
		"div .smio-setup-inner":
			"SlidePanel #stepslide .smio-setup-stepslide":
				itemClass: 'smio-setup-stepbox'
				onItemSelect: (i, id) => @onSlide i, id
				items:
					"owner":
						'div .smio-setup-stepbox-title':
							[@r 'steptitle_owner']
						'div .smio-setup-stepbox-form':
							"TextInput #owner_name":
								labelText: @r 'owner_name'
								nospellcheck: true
							"TextInput #owner_pass":
								labelText: @r 'owner_pass'
								type: 'password'
							"div .smio-setup-stepbox-form-label":
								html: ['The Hub owner specified above is:']
							"div":
								"Toggle #owner_create":
									toggleName: 'owner_toggle'
									labelHtml: @r 'owner_create', 'localhost'
									checked: true
								"Toggle #owner_login":
									toggleName: 'owner_toggle'
									labelHtml: @r 'owner_login', 'localhost'
					"template":
						"div .smio-setup-stepbox-title":
							[@r 'steptitle_template']
						"div .smio-setup-stepbox-form":
							text: ['Hub templates are not yet available.']
					"finish":
						"div .smio-setup-stepbox-title":
							[@r 'steptitle_finish']
						"div .smio-setup-stepbox-form":
							html: ['mooboar<br/><br/>blaa<br/><br/>foo<br/><br/>yeah right']
		"TabStrip #steptabs .smio-setup-outer .smio-setup-steptabs":
			"tabClass": 'smio-setup-steptab'
			"tabs": ['owner', 'template', 'finish']
			"resPrefix": 'steps_'
			"onTabSelect": (tabID) => @onTabSelect tabID

onLoad: ->
	super()
	@controls['stepslide'].controls['owner_name'].sub('input').focus()

onSlide: (index, itemID) ->
	@controls.steptabs.selectTab itemID

onTabSelect: (tabID) ->
	@controls.stepslide.scrollTo tabID

#endif

