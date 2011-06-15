###
Auto-generated from Core/ServerSetup/InitialHubSetup.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_ServerSetup_InitialHubSetup extends smio.Control


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
				"div.smio-setup-header":
					html: [@r 'title', 'smio-setup-header-detail', smio.Control.util.jsVoid, @urlSeg()]
				"div.smio-setup-header-desc": [@r 'desc']
			"div .smio-setup-inner":
				"SlidePanel #stepslide .smio-setup-stepslide":
					itemClass: 'smio-setup-stepbox'
					onItemSelect: (i, id) =>
						@onSlide i, id
					items:
						"#owner":
							'div .smio-setup-stepbox-title':
								[@r 'steptitle_owner']
							'div .smio-setup-stepbox-form':
								"TextInput #owner_name":
									autoFocus: true
									labelText: @r 'owner_name'
									nospellcheck: true
								"TextInput #owner_pass":
									labelText: @r 'owner_pass'
									type: 'password'
								"div .smio-setup-stepbox-form-label":
									html: [@r 'owner_choice']
								"Toggles #owner":
									disabled: true
									items:
										"#create":
											checked: true
											labelHtml: @r 'owner_create', 'localhost'
										"#login":
											labelHtml: @r 'owner_login', 'localhost'
						"#template":
							"div .smio-setup-stepbox-title":
								[@r 'steptitle_template']
							"div .smio-setup-stepbox-form":
								text: ['Hub templates are not yet available.']
						"#finish":
							"div .smio-setup-stepbox-title":
								[@r 'steptitle_finish']
							"div .smio-setup-stepbox-form":
								"TextInput #hub_title":
									required: true
									placeholder: @r 'hub_titlehint'
									labelText: @r 'hub_title'
								"div .smio-setup-stepbox-form-label":
									html: [@r 'hub_hint']
								"ul #hubhints":
									"li #hubhint1": [@r 'hubhint1']
									"li #hubhint2": [@r 'hubhint2']
									"li #hubhint3": [@r 'hubhint3']
									"li #hubhint4": [@r 'hubhint4']
			"TabStrip #steptabs .smio-setup-outer .smio-setup-steptabs":
				"tabClass": 'smio-setup-steptab'
				"tabs": ['owner', 'template', 'finish']
				"resPrefix": 'steps_'
				"onTabSelect": (tabID) => @onTabSelect tabID
	
	onLoad: ->
		super()
		$('.smio-setup-header-detail').click =>
			port = smio.iif "#{@client.pageUrl.attr 'port'}" is '80', '', ":#{@client.pageUrl.attr 'port'}"
			nurl = (prompt (@r 'url_hint', (@client.pageUrl.attr 'protocol'), (@client.pageUrl.attr 'host'), port), urlseg = @urlSeg())
			if nurl? and nurl isnt null and nurl isnt urlseg
				if not _.startsWith nurl, '/'
					nurl = "/#{nurl}"
				location.replace _.trim nurl
	
	onSlide: (index, itemID) ->
		@controls.steptabs.selectTab itemID
	
	onTabSelect: (tabID) ->
		@controls.stepslide.scrollTo tabID
	
	urlSeg: ->
		urlseg = _.trim (@client.pageUrl.attr 'path'), '/'
		urlseg = smio.iif urlseg, "/#{urlseg}/", '/'
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_ServerSetup_InitialHubSetup"

	classNamespace: ->
		"Core_ServerSetup"