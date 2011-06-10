###
Auto-generated from Core/ServerSetup/InitialSiteSetup.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_ServerSetup_InitialSiteSetup extends smio.Control


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
								"TextInput #owner_pass":
									labelText: @r 'owner_pass'
									type: 'password'
								"Toggle #owner_login":
									labelText: @r 'owner_login'
									toggleName: 'owner_toggle'
								"Toggle #owner_create":
									labelText: @r 'owner_create'
									toggleName: 'owner_toggle'
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
	
	


	constructor: (client, parent, args) ->
		super client, parent, args, "Core_ServerSetup", "Core_ServerSetup_InitialSiteSetup"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()