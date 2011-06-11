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
	"div .smio-setup":
		"id": ''
		"div .smio-setup-outer .smio-setup-outer-top":
			"div.smio-setup-header": [@r 'title']
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
							"span .smio-setup-stepbox-form-label":
								html: ['The Hub owner specified above is:']
							"Toggle #owner_login":
								labelHtml: @r 'owner_login', 'localhost'
								toggleName: 'owner_toggle'
								checked: true
								type: 'checkbox'
							"Toggle #owner_create":
								type: 'checkbox'
								labelHtml: @r 'owner_create', 'localhost'
								toggleName: 'owner_toggle'
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

onSlide: (index, itemID) ->
	@controls.steptabs.selectTab itemID

onTabSelect: (tabID) ->
	@controls.stepslide.scrollTo tabID

#endif

