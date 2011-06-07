#if client

onSlide: (index, itemID) ->
	@controls.steptabs.selectTab itemID

onTabSelect: (tabID) ->
	@controls.stepslide.scrollTo tabID

renderTemplate: ->
	"div .smio-setup":
		"id": @id()
		"div .smio-setup-outer .smio-setup-outer-top":
			"div.smio-setup-header": @r 'title'
			"div.smio-setup-header-desc": @r 'desc'
		"div .smio-setup-inner":
			"SlidePanel #stepslide .smio-setup-stepslide":
				itemClass: 'smio-setup-stepbox'
				onItemSelect: (i, id) => @onSlide i, id
				items: [
					"item #owner":
						'div .smio-setup-stepbox-title':
							@r 'steptitle_owner'
						'div .smio-setup-stepbox-form':
							'ding blaa<br/><br/>foo<br/><br/>yeah right'
					"item #template":
						"div .smio-setup-stepbox-title":
							@r 'steptitle_template'
						"div .smio-setup-stepbox-form":
							'boar<br/>blaa<br/><br/>foo<br/><br/>yeah right'
					"item #finish":
						"div .smio-setup-stepbox-title":
							@r 'steptitle_finish'
						"div .smio-setup-stepbox-form":
							'mooboar<br/><br/>blaa<br/><br/>foo<br/><br/>yeah right'
				]
		"TabStrip #steptabs .smio-setup-outer .smio-setup-steptabs":
			"tabClass": 'smio-setup-steptab'
			"tabs": ['owner', 'template', 'finish']
			"resPrefix": 'steps_'
			"onTabSelect": (tabID) => @onTabSelect tabID

#endif

