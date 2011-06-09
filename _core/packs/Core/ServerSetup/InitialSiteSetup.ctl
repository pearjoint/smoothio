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
							html: ['ding blaa<br/><br/>foo<br/><br/>yeah right']
							TextInput:
								id: 'input'
					"template":
						"div .smio-setup-stepbox-title":
							[@r 'steptitle_template']
						"div .smio-setup-stepbox-form":
							html: ['boar<br/>blaa<br/><br/>foo<br/><br/>yeah right']
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

