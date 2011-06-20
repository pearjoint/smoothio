
#if server
_ = require 'underscore'
_.mixin require 'underscore.string'
coffee = require 'coffee-script'
node_util = require 'util'
#endif
smio = global.smoothio

class smio.Control
#if server
	@compile: (@inst, ctlContent, controlPath) =>
		[inDyn, oneUp, contentParts, decls, renderParts, lastChar, lastContent, obj, staToc] = [false, '../', [], '', [], '', '', {}, '@@']
		pathParts = controlPath.substr(0, controlPath.lastIndexOf('.')).split('/')
		baseName = pathParts[0 ... pathParts.length - 1].join('_')
		className = pathParts.join('_')
		if ctlContent and ctlContent[0] isnt '<'
			ctlContent = '<%script:\n' + ((smio.iif(l[0] is '#', '', '\t') + l) for l in ctlContent.split('\n')).join('\n') + '\n%>'
		while (pos = ctlContent.indexOf(staToc)) >= 0
			ctlContent = ctlContent.substr(0, pos) + "smio[@classPath()]" + ctlContent.substr(pos + staToc.length)
		for c in ctlContent
			if ((lastChar + c) is '<%') and not inDyn
				inDyn = true
				if lastContent
					contentParts.push("s": lastContent.substr(0, lastContent.length - 1))
					lastContent = ''
			else if ((lastChar + c) is '%>') and inDyn
				inDyn = false
				if lastContent
					contentParts.push("d": lastContent.substr(0, lastContent.length - 1))
					lastContent = ''
			else
				lastContent += c
			lastChar = c
		if lastContent
			obj[if inDyn then 'd' else 's'] = lastContent
			contentParts.push(obj)
		for part in contentParts
			if part['s']
				renderParts.push(part['s'])
			else if dyn = part['d']
				[dynCmd, posC, posS] = ['', dyn.indexOf(':'), [dyn.indexOf(' '), dyn.indexOf('\t'), dyn.indexOf('\r'), dyn.indexOf('\n')]]
				isCmd = (posC >= 0) and (_.any((((tmpPos >= 0) and (tmpPos > posC)) for tmpPos in posS)) or _.all(((tmpPos2 < 0) for tmpPos2 in posS), _.identity))
				if isCmd
					dynCmd = dyn.substr(0, posC)
					dyn = dyn.substr(posC + 1)
				else if dyn[0] is '='
					dynCmd = '='
					dyn = dyn.substr(1)
				else
					dynCmd = '_'
				if dynCmd is 'script'
					decls += "\n#{dyn}\n"
				else
					renderParts.push([dynCmd, dyn])
		coffeeScript = """
###
Auto-generated from #{controlPath}
###
#{"#if server"}
require '#{smio.Util.String.times oneUp, pathParts.length}_jscript/shared/Control'
#{"#endif"}
smio = smoothio = global.smoothio
class smio.Packs_#{className} extends smio.Control
#{decls}
	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		#{JSON.stringify className}

	classNamespace: ->
		#{JSON.stringify baseName}
"""
		if renderParts and renderParts.length
			[ind, indent, rind, stimes] = [-1, 3, 2, smio.Util.String.times]
			subs = 0
			coffeeScript += "\n\trenderHtml: ($el) =>\n\t\t__r = ctls: [], m: []\n\t\t__r.p = ((r) -> (v) -> r.o.push v) __r\n\t\t__r.o = __r.m\n"
			for rp in renderParts
				br = "\n#{stimes '\t', rind}"
				if _.isString(rp)
					coffeeScript += "#{br}__r.p #{JSON.stringify rp}"
				else if _.isArray(rp) and rp.length and rp.length > 1
					if rp[0] is '='
						coffeeScript += "#{br}__r.p #{rp[1]}"
					else if rp[0] is '_'
						lines = rp[1].split('\n')
						rp[1] = ''
						if lines and lines.length
							for l in lines
								if l and l.length and _.trim(l)
									if ind < 0
										ind = 0
										for c in l
											if c is '\t'
												ind++
											else
												break
									rind = indent + ind
									rp[1] += "\n#{stimes '\t', indent}#{l.substr ind}"
							if lines.length > 1
								l = _.last(lines)
								lind = 0
								for c in l
									if c is '\t'
										lind++
									else
										break
								rind = indent + (lind - ind)
							if rp[1] and _.trim(rp[1]) and _.trim(rp[1], ' ', '\t', '\r', '\n')
								coffeeScript += "#{rp[1]}"
					else
						sarg = rp[1]
						jarg = null
						if (pos = sarg.indexOf('{')) > 0
							jarg = sarg.substr(pos)
							sarg = _.trim(sarg.substr(0, pos))
						if rp[0] is 'begin'
							subs = subs + 1
							coffeeScript += "#{br}tmp = []#{br}__r.ctls.push o: tmp, c: #{JSON.stringify sarg}, args: #{jarg}#{br}__r.o = tmp"
						else if rp[0] is 'end'
							subs = subs - 1
							coffeeScript += "#{br}tmp = __r.ctls.pop()#{br}__r.o = " + (if subs then "__r.ctls[#{subs - 1}].o" else '__r.m')
							if subs
								coffeeScript += "#{br}__r.p t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)"
							else
								coffeeScript += "#{br}__r.p @renderTag 'ctl', tmp.c, smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o"
						else if subs
							coffeeScript += "#{br}__r.p t: #{JSON.stringify rp[0]}, s: #{JSON.stringify sarg}, a: #{jarg}"
						else
							coffeeScript += "#{br}__r.p @renderTag #{JSON.stringify rp[0]}, #{JSON.stringify sarg}, #{jarg}"
			coffeeScript += "\n#{stimes '\t', indent - 1}_html = __r.o.join ''\n#{stimes '\t', indent - 1}if $el\n#{stimes '\t', indent}$el.html _html\n#{stimes '\t', indent - 1}_html\n"
		coffeeScript

	@load: (className, parent, args) =>
		parts = className.split('_')
		require('../../_packs/' + parts[0...parts.length - 1].join('/') + '/_ctl_' + _.last(parts))
		new (smio['Packs_' + className])(null, parent, args)

#endif

#if client
	coreDisable: (disable) =>

	disable: (disable, isInherit) =>
		if not arguments.length
			disable = isInherit = true
		if not isInherit
			@disabled = disable
		else if not disable
			disable = @disabled
		if @el
			if disable
				@el.removeClass('smio-enabled').addClass('smio-disabled')
			else
				@el.removeClass('smio-disabled').addClass('smio-enabled')
		@coreDisable(disable)
		len = 0
		for ctl in @controls
			len++
			ctl.disable(disable, isInherit)
		if @el and (len is 0)
			@el[if disable then 'addClass' else 'removeClass']('smio-disabledfaded')

	enable: =>
		@disable(false, true)

	on: (eventName, handler) =>
		if eventName
			ehs = @['eventHandlers']
			if _.isFunction(handler)
				if not ehs
					ehs = @['eventHandlers'] = {}
				if not ehs[eventName]
					ehs[eventName] = []
				if not (handler in ehs[eventName])
					ehs[eventName].push handler
			else if ehs and ehs[eventName]
				for eh in ehs[eventName]
					eh.apply(@, handler)

	onLoad: () =>
		@el = $('#' + @id())
		if @disabled
			@el.removeClass('smio-enabled').addClass('smio-disabled')
			if not @controls.length
				@el.addClass('smio-disabledfaded')
		else
			@el.removeClass('smio-disabled').addClass('smio-enabled')
		for ctl in @controls
			ctl.onLoad()

	onWindowResize: (width, height) =>

	sub: (id) =>
		ctl = @
		if (parts = id.split('/')).length > 1
			for i in [0...parts.length - 1]
				ctl = ctl.ctl(parts[i])
		$("##{ctl.id(parts[parts.length - 1])}")

	syncUpdate: (ctlDesc) =>

	un: (eventName, handler) =>
		if eventName and (ehs = @['eventHandlers']) and ehs[eventName] and _.isFunction(handler)
			ehs[eventName] = _.without(ehs[eventName], handler)
#endif

	@util:
		jsVoid: 'javascript:void(0);'
	@tagRenderers:
		"arg": (ctl, name) ->
			ctl.args[name]
		"ctl": (ctl, className, args, emptyIfMissing) ->
			subCtl = _.detect(ctl.controls, (sc) -> sc.ctlID is args.id)
			if (not subCtl) and ((ctor = smio["Packs_#{ctl.classNamespace()}_#{className}"]) or (ctor = smio["Packs_#{ctl.classNamespace()}_Controls_#{className}"]) or (ctor = smio["Packs_Core_Controls_#{className}"] ))
				ctl.controls.push(subCtl = new ctor(ctl.client, ctl, args))
				ctl.client.allControls[subCtl.id()] = subCtl
			if subCtl
				subCtl.renderHtml()
			else if (renderFunc = ctl["renderHtml_#{className}"])
				renderFunc(className, args)
			else
				if emptyIfMissing then '' else "!!CONTROL_NOT_FOUND::#{className}!!"
		"inner": (ctl, name, args) ->
			o = []
			a = if args then args else ctl.args
			if (a['__o'] and a.__o['length'])
				for ao in a.__o
					if _.isString(ao)
						o.push(ao)
					else
						o.push(ctl.renderTag(ao.t, ao.s, ao.a))
			o.join('')
		"r": (ctl, name, args...) ->
			ctl.res name, args...
		"tojs": (ctl, name, args) ->
			for pn, pv of args
				name = name.replace(pn, pv)
			CoffeeScript.compile(name).split('\n').join('')

	constructor: (@client, @parent, @args) ->
		@disabled = smio.iif(@args.disabled)
		@ctlID = @args.id
		@controls = []
		@el = null

	classPath: =>
		"Packs_#{@className()}"

	cls: =>
		smio[@classPath()]

	cssBaseClass: =>
		''

	cssClass: () =>
		a = ['smio']
		if (bc = @cssBaseClass())
			a.push(bc)
		for sub in arguments
			if sub
				a.push(sub)
		a.join('-')

	ctl: (ctlID) =>
		if (c = @client.allControls[ctlID]) then c else @client.allControls[@id(ctlID)]

	id: (subID) =>
		# (if @idStack.length then ((@idStack.join '_') + '_') else '')
		(if @parent then "#{@parent.id()}_#{@ctlID}" else @ctlID) + (if subID then ('_' + subID) else '')

	init: =>

	jsonTemplates_HasLabel: (target) =>
		@args.labelText or @args.labelHtml or @args.labelRawText or @args.labelRawHtml

	jsonTemplates_Label: (target) =>
		rawLabel = if @args.labelRawHtml then @args.labelRawHtml else @args.labelRawText
		label = if @args.labelHtml then @args.labelHtml else @args.labelText
		if rawLabel
			target[if @args.labelRawHtml then 'html' else '_'] = [rawLabel]
		else if label
			target[if @args.labelHtml then 'html' else '_'] = [@r(label)]

	jsSelf: =>
		"smio.client.allControls['" + @id() + "']"

	renderJsonTemplate: (tagKey, objTree, level) =>
		buf = ''
		toHtml = smio.Util.String.htmlEncode
		toAtt = (an, av) =>
			av = "#{av}"
			" #{an}=\"#{toHtml(if (an is 'id') then @id(av) else av)}\""
		if not level
			level = 0
		if (kt = _.trim(tagKey))
			atts = {}
			attstr = ''
			kc = []
			while (pos = kt.lastIndexOf('.')) > 0
				kc.push(_.trim(kt.substr(pos + 1)))
				kt = _.trim(kt.substr(0, pos))
			if kc.length
				atts['class'] = kc.join(' ')
			if (pos = kt.lastIndexOf('#')) > 0
				atts.id = _.trim(kt.substr(pos + 1))
				kt = _.trim(kt.substr(0, pos))
			for an, av of atts
				attstr += toAtt(an, av)
			if not objTree
				buf += "<#{kt}#{attstr}/>"
			else if typeof(objTree) is 'object'
				if (result = smio.Control.tagRenderers.ctl(@, kt, smio.Util.Object.mergeDefaults(_.clone(objTree), atts), true))
					buf += result
				else
					buf += "<#{kt}#{attstr}"
					hasc = false
					haso = false
					for name, val of objTree
						if val?
							if _.isArray(val) or (typeof(val) is 'object')
								haso = true
							else
								buf += toAtt(name, val)
					if haso
						for name, val of objTree
							if val
								if _.isArray(val)
									if not hasc
										hasc = true
										buf += ">"
									buf += (if (name is '_') then toHtml(val.join '') else if (name is 'html') then val.join('') else @renderJsonTemplate(name, toHtml(val.join('')), level + 1))
								else if (typeof(val) is 'object')
									if not hasc
										hasc = true
										buf += ">"
									buf += @renderJsonTemplate(name, val, level + 1)
					buf += (if hasc then "</#{kt}>" else "/>")
			else
				buf += "<#{kt}#{attstr}>#{if _.isArray(objTree) then (if (kt is 'html') then objTree.join('') else toHtml(objTree.join(''))) else objTree}</#{kt}>"
		buf

	renderHtml: ($el) =>
		_html = ''
		if @['renderTemplate'] and _.isFunction(@renderTemplate) and (objTree = @renderTemplate())
			for tagKey, subTree of objTree
				_html += @renderJsonTemplate(tagKey, subTree)
		if $el
			$el.html(_html)
		_html

	renderTag: (name, sarg, jarg) =>
		renderer = smio.Control.tagRenderers[name]
		if renderer
			renderer(@, sarg, jarg)
		else
			"!!UNKNOWN_TAG::#{name}!!"

	r: (name, args...) =>
		@res(name, args...)

	res: (name, args...) =>
		ret = ''
		if ((not args) or (not args.length)) and _.isArray(name) and (name.length > 1)
			args = name[1..]
			name = name[0]
		if (resSets = (if @client then smio.resources else smio.inst.resourceSets))
			parts = @classNamespace().split('_')
			for i in [(parts.length - 1)..0]
				if (resSet = resSets[parts[0..i].join('_')]) and (ret = (if @client then resSet[name] else resSet['en'][name]))
					break
			if not ret
				ret = if @client then resSets.smoothio[name] else resSets.smoothio['en'][name]
		if ret then (if args.length then _.sprintf(ret, args...) else ret) else (if @parent then @parent.res(name, args...) else "!!RES::#{name}!!")

