###
Auto-generated from Core/ServerSetup/InitialHubSetup.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_ServerSetup_InitialHubSetup extends smio.Control


#const $CC smio-setup
	
#if server
	
	renderTemplate: =>
		"div .$CC":
			"id": ''
			"div .$CC-outer .$CC-outer-top":
				"div .$CC-header": [@r 'nojs_title']
				"div .$CC-header-desc": [@r 'nojs_desc']
	
#endif
	
#if client
	
	renderTemplate: =>
		"div .$CC":
			"id": ''
			"div .$CC-outer .$CC-outer-top":
				"div .$CC-header":
					html: [@r('title', '$CC-header-detail', smio.Control.util.jsVoid, @urlSeg())]
				"div .$CC-header-desc": [@r 'desc']
			"div .$CC-inner":
				"SlidePanel #stepslide .$CC-stepslide":
					itemClass: '$CC-stepbox'
					onItemSelect: @onSlide
					items:
						"#owner":
							'div .$CC-stepbox-title':
								[@r 'steptitle_owner']
							'div .$CC-stepbox-form':
								"Controls #user":
									ctltype: 'TextInput'
									required: true
									nospellcheck: true
									labelText: (id) => @r("owner_#{id}")
									placeholder: (id) => @r("owner_#{id}hint")
									type: (id) => if (id isnt 'name') then 'password' else ''
									items: ['#name', '#pass', '#pass2']
								"div .$CC-stepbox-form-label":
									html: [@r 'owner_choice']
								"Controls #owner":
									ctltype: 'Toggle'
									disabled: true
									name: @id('owner_toggle')
									items:
										"#create":
											checked: true
											labelHtml: @r('owner_create', 'localhost')
										"#login":
											labelHtml: @r('owner_login', 'localhost')
						"#template":
							"div .$CC-stepbox-title":
								[@r 'steptitle_template']
							"div .$CC-stepbox-form":
								text: ['Hub templates are not yet available.']
						"#finish":
							"div .$CC-stepbox-title":
								[@r 'steptitle_finish']
							"div .$CC-stepbox-form":
								"TextInput #hub_title":
									required: true
									placeholder: @r('hub_titlehint')
									labelText: @r('hub_title')
								"div .$CC-stepbox-form-label":
									html: [@r 'hub_hint']
			"TabStrip #steptabs .$CC-outer .$CC-steptabs":
				"tabClass": '$CC-steptab'
				"tabs": ['owner', 'template', 'finish']
				"resPrefix": 'steps_'
				"onTabSelect": (tabID) => @onTabSelect(tabID)
	
	onLoad: =>
		super()
		$('.$CC-header-detail').click =>
			port = if ("#{@client.pageUrl.attr 'port'}" is '80') then '' else ":#{@client.pageUrl.attr 'port'}"
			nurl = prompt(@r('url_hint', @client.pageUrl.attr('protocol'), @client.pageUrl.attr('host'), port), urlseg = @urlSeg())
			if nurl? and (nurl isnt null) and (nurl isnt urlseg)
				if not _.startsWith(nurl, '/')
					nurl = "/#{nurl}"
				location.replace(_.trim(nurl))
	
	onSlide: (index, itemID) =>
		@controls.steptabs.selectTab(itemID)
	
	onTabSelect: (tabID) =>
		@controls.stepslide.scrollTo(tabID)
	
	urlSeg: =>
		if (urlseg = _.trim(@client.pageUrl.attr('path'), '/')) then "/#{urlseg}/" else '/'
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_ServerSetup_InitialHubSetup"

	classNamespace: ->
		"Core_ServerSetup"