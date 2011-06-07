
#if server
_ = require 'underscore'
_.mixin require 'underscore.string'
coffee = require 'coffee-script'
node_util = require 'util'
#endif
smio = global.smoothio

class smio.Control
#if server
	@compile: (@inst, ctlContent, controlPath) ->
		[inDyn, oneUp, contentParts, decls, renderParts, lastChar, lastContent, obj] = [false, '../', [], '', [], '', '', {}]
		pathParts = ((controlPath.substr 0, controlPath.lastIndexOf '.').split '/')
		baseName = pathParts[0...(pathParts.length - 1)].join '_'
		className = pathParts.join '_'
		if ctlContent and '<' isnt ctlContent.substr 0, 1
			lines = []
			for l in ctlContent.split '\n'
				lines.push (if ('#' isnt l.substr 0, 1) then '\t' else '') + l
			ctlContent = "<%script:\n#{lines.join '\n'}\n%>"
		for c in ctlContent
			if ((lastChar + c) is '<%') and not inDyn
				inDyn = true
				if lastContent
					contentParts.push "s": lastContent.substr 0, lastContent.length - 1
					lastContent = ''
			else if ((lastChar + c) is '%>') and inDyn
				inDyn = false
				if lastContent
					contentParts.push "d": lastContent.substr 0, lastContent.length - 1
					lastContent = ''
			else
				lastContent += c
			lastChar = c
		if lastContent
			obj[if inDyn then 'd' else 's'] = lastContent
			contentParts.push obj
		for part in contentParts
			if part['s']
				renderParts.push part['s']
			else if dyn = part['d']
				[dynCmd, posC, posS] = ['', (dyn.indexOf ':'), [(dyn.indexOf ' '), (dyn.indexOf '\t'), (dyn.indexOf '\r'), (dyn.indexOf '\n')]]
				isCmd = (posC >= 0) and ((_.any (((tmpPos >= 0) and (tmpPos > posC)) for tmpPos in posS)) or (_.all ((tmpPos2 < 0) for tmpPos2 in posS), _.identity))
				if isCmd
					dynCmd = dyn.substr 0, posC
					dyn = dyn.substr posC + 1
				else if (dyn.substr 0, 1) is '='
					dynCmd = '='
					dyn = dyn.substr 1
				else
					dynCmd = '_'
				if dynCmd is 'script'
					decls += "\n#{dyn}\n"
				else
					renderParts.push [dynCmd, dyn]
		coffeeScript = """
###
Auto-generated from #{controlPath}
###
#{"#if server"}
require '#{smio.Util.String.times oneUp, pathParts.length}_jscript/Control'
#{"#endif"}
smio = smoothio = global.smoothio
class smio.Packs_#{className} extends smio.Control
#{decls}
#{"#if client"}
	constructor: (client, parent, args) ->
		super client, parent, args, #{JSON.stringify baseName}, #{JSON.stringify className}
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()
"""
		if renderParts and renderParts.length
			[ind, indent, rind, stimes] = [-1, 3, 3, smio.Util.String.times]
			subs = 0
			coffeeScript += "\n\trenderHtml: ($el) ->\n\t\tif not @_html\n\t\t\t__r = ctls: [], m: []\n\t\t\t__r.o = __r.m\n"
			for rp in renderParts
				br = "\n#{stimes '\t', rind}"
				if _.isString rp
					coffeeScript += "#{br}__r.o.push #{JSON.stringify rp}"
				else if (_.isArray rp) and rp.length and rp.length > 1
					if rp[0] is '='
						coffeeScript += "#{br}__r.o.push #{rp[1]}"
					else if rp[0] is '_'
						lines = rp[1].split '\n'
						rp[1] = ''
						if lines and lines.length
							for l in lines
								if l and l.length and (_.trim l)
									if ind < 0
										ind = 0
										for i in [0...l.length]
											if (l.substr i, 1) is '\t'
												ind++
											else
												break
									rind = indent + ind
									rp[1] += "\n#{stimes '\t', indent}#{l.substr ind}"
							if lines.length > 1
								l = _.last lines
								lind = 0
								for i in [0...l.length]
									if (l.substr i, 1) is '\t'
										lind++
									else
										break
								rind = indent + (lind - ind)
							if rp[1] and (_.trim rp[1]) and (_.trim rp[1], ' ', '\t', '\r', '\n')
								coffeeScript += "#{rp[1]}"
					else
						sarg = rp[1]
						jarg = null
						if (pos = sarg.indexOf '{') > 0
							jarg = sarg.substr pos
							sarg = _.trim sarg.substr 0, pos
						if rp[0] is 'begin'
							subs = subs + 1
							coffeeScript += "#{br}tmp = []#{br}__r.ctls.push o: tmp, c: #{JSON.stringify sarg}, args: #{jarg}#{br}__r.o = tmp"
						else if rp[0] is 'end'
							subs = subs - 1
							coffeeScript += "#{br}tmp = __r.ctls.pop()#{br}__r.o = " + (if subs then "__r.ctls[#{subs - 1}].o" else '__r.m')
							if subs
								coffeeScript += "#{br}__r.o.push t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)"
							else
								coffeeScript += "#{br}__r.o.push @renderTag 'ctl', tmp.c, smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o"
						else if subs
							coffeeScript += "#{br}__r.o.push t: #{JSON.stringify rp[0]}, s: #{JSON.stringify sarg}, a: #{jarg}"
						else
							coffeeScript += "#{br}__r.o.push @renderTag #{JSON.stringify rp[0]}, #{JSON.stringify sarg}, #{jarg}"
			coffeeScript += "\n#{stimes '\t', indent}@_html = __r.o.join ''\n#{stimes '\t', indent - 1}if $el\n#{stimes '\t', indent}$el.html @_html\n#{stimes '\t', indent - 1}@_html\n#{"#endif"}\n"
		coffeeScript
#endif
#if client
	@tagRenderers:
		"arg": (ctl, name) ->
			ctl.args[name]
		"ctl": (ctl, className, args, emptyIfMissing) ->
			if (not ctl.controls[args.id]) and ((ctor = smio['Packs_' + ctl.baseName + '_' + className]) or (ctor = smio['Packs_' + ctl.baseName + '_Controls_' + className]) or (ctor = smio['Packs_Core_Controls_' + className] ))
				ctl.client.allControls[args.id] = ctl.controls[args.id] = new ctor @client, ctl, args
			if ctl.controls[args.id]
				ctl.controls[args.id].renderHtml()
			else if ctl.ctlRenderers[className]
				ctl.ctlRenderers[className] className, args
			else
				if emptyIfMissing then '' else "!!CONTROL_NOT_FOUND::#{className}!!"
		"inner": (ctl, name, args) ->
			o = []
			a = if args then args else ctl.args
			if (a['__o'] and a.__o['length'])
				for i in [0...a.__o.length]
					if _.isString (tmp = a.__o[i])
						o.push tmp
					else
						o.push ctl.renderTag tmp.t, tmp.s, tmp.a
			o.join ''
		"r": (ctl, name) ->
			ctl.res.apply ctl, [name]
		"tojs": (ctl, name, args) ->
			for pn, pv of args
				name = name.replace pn, pv
			((CoffeeScript.compile name).split '\n').join ''

	constructor: (@client, @parent, @args, @baseName, @className) ->
		@ctlID = @args.id
		@controls = {}
		@containers = {}
		@ctlRenderers = {}
		@eventHandlers = {}
		@el = null
		@_html = ''

	ctl: (ctlID) ->
		c = @client.allControls ctlID
		if c then c else @client.allControls @id(ctlID)

	id: (subID) ->
		myID = if @parent then "#{@parent.id()}_#{@ctlID}" else @ctlID
		if (subID)
			myID + '_' + subID
		else
			myID

	init: ->

	on: (eventName, handler) ->
		if eventName
			if _.isFunction handler
				if not @eventHandlers[eventName]
					@eventHandlers[eventName] = []
				if 0 > _.indexOf @eventHandlers[eventName], handler
					@eventHandlers[eventName].push handler
			else if @eventHandlers[eventName]
				for eh in @eventHandlers[eventName]
					eh.apply @, handler

	onLoad: () ->
		prefix = "cscript:"
		@el = $('#' + @id())
		for id, ctl of @controls
			ctl.onLoad()
		if not @parent
			$("a[href^='#{prefix}']").each (i, a) ->
				try
					a.href = 'javascript:' + ((CoffeeScript.compile a.href.substr prefix.length).split '\n').join ''
				catch err
					alert "CODE:#{(unescape a.href).substr prefix.length}:CODE"
					a.href = "javascript:smio.client.socket.onError(\"#{err}\");"

	onWindowResize: (width, height) ->

	renderJsonTemplate: (json, buf) ->
		toAtt = (an, av) ->
			" #{an}=\"#{av}\""
		is1 = false
		if not buf
			is1 = true
			buf = []
		for k, v of json
			if (kt = _.trim k)
				atts = {}
				attstr = ''
				kc = []
				while (pos = kt.lastIndexOf '.') > 0
					kc.push _.trim kt.substr pos + 1
					kt = _.trim kt.substr 0, pos
				if kc.length
					atts['class'] = kc.join ' '
				if (pos = kt.lastIndexOf '#') > 0
					atts.id = _.trim kt.substr pos + 1
					kt = _.trim kt.substr 0, pos
				for an, av of atts
					attstr += toAtt an, av
				if not v
					buf.push "<#{kt}#{attstr}/>"
				else if typeof(v) is 'object'
					if (result = smio.Control.tagRenderers.ctl @, kt, (smio.Util.Object.mergeDefaults v, atts), true)
						buf.push result
					else
						buf.push "<#{kt}#{attstr}"
						hasc = false
						haso = false
						for name, val of v
							if val
								if (typeof(val) is 'object')
									haso = true
								else
									buf.push toAtt name, val
						if haso
							for name, val of v
								if val and (typeof(val) is 'object')
									if not hasc
										hasc = true
										buf.push ">"
									@renderJsonTemplate val, buf
						buf.push if hasc then "</#{kt}>" else "/>"
				else
					buf.push "<#{kt}#{attstr}>#{v}</#{kt}>"
		if is1
			alert buf.join ''
		buf.join ''

	renderHtml: ($el) ->
		if (not @_html) and @['renderTemplate'] and _.isFunction @renderTemplate
			@_html = @renderJsonTemplate @renderTemplate()
		if $el
			$el.html @_html
		@_html

	renderTag: (name, sarg, jarg) ->
		renderer = smio.Control.tagRenderers[name]
		if renderer
			renderer(@, sarg, jarg)
		else
			"!!UNKNOWN_TAG::#{name}!!"

	syncUpdate: (ctlDesc) ->

	un: (eventName, handler) ->
		if eventName and @eventHandlers[eventName] and _.isFunction handler
			@eventHandlers[eventName] = _.without @eventHandlers[eventName], handler

#endif

	r: (name) ->
		@res name

	res: (name) ->
		ret = ''
		if (resSets = smio.resources)
			parts = @baseName.split '_'
			for i in [(parts.length - 1)..0]
				if (resSet = resSets[parts[0..i].join '_']) and (ret = resSet[name])
					break
			if not ret
				ret = smio.resources.smoothio[name]
		if ret then ret else (if @parent then (@parent.res name) else "!!RES::#{name}!!")

