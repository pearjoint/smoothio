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
									onChange: => @verifyInputs
									required: true
									nospellcheck: true
									labelText: (id) => "owner_#{id}"
									placeholder: (id) => "owner_#{id}hint"
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
											labelHtml: ['owner_create', 'localhost']
										"#login":
											labelHtml: ['owner_login', 'localhost']
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
									placeholder: 'hub_titlehint'
									labelText: 'hub_title'
								"div .$CC-stepbox-form-label":
									html: [@r 'hub_hint']
								"Controls #bg":
									ctltype: 'Toggle'
									name: @id('hub_bg')
									checked: (id) => id is 'bg0'
									labelHtml: (id) => 'nbsp'
									style: (id) => 'background-image': "url('/_/file/images/#{id}.jpg')"
									onCheck: (id) => (chk) =>
										if chk
											@client.pageBody.css("background-image": "url('/_/file/images/#{id}.jpg')")
									items: ['#bg0', '#bg1', '#bg2', '#bg3', '#bg4']
								"div .$CC-createbtn":
									"LinkButton #hub_create .smio-bigbutton":
										disabled: true
										labelText: 'hub_create'
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
		@ctl('steptabs').selectTab(itemID)
	
	onTabSelect: (tabID) =>
		@ctl('stepslide').scrollTo(tabID)
	
	urlSeg: =>
		if (urlseg = _.trim(@client.pageUrl.attr('path'), '/')) then "/#{urlseg}/" else '/'
	
	verifyInputs: ($input) =>
		userVal = _.trim('' + @sub('stepslide/user/user').val())
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_ServerSetup_InitialHubSetup"

	classNamespace: ->
		"Core_ServerSetup"