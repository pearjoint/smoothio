
#if server
_ = require 'underscore'
_.mixin require 'underscore.string'
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
	constructor: (client, args) ->
		super client, args, #{JSON.stringify baseName}, #{JSON.stringify className}
		@init()

	renderHtml: ($el) ->
		if not @_html
			parts = []
"""
		[ind, indent, rind, stimes] = [-1, 3, 3, smio.Util.String.times]
		for rp in renderParts
			if _.isString rp
				coffeeScript += "\n#{stimes '\t', rind}parts.push #{JSON.stringify rp}"
			else if (_.isArray rp) and rp.length and rp.length > 1
				if rp[0] is '='
					coffeeScript += "\n#{stimes '\t', rind}parts.push #{rp[1]}"
				else if rp[0] is '_'
					lines = rp[1].split '\n'
					rp[1] = ''
					for l in lines
						if l and l.length
							if ind < 0
								ind = 0
								for i in [0...l.length]
									if (l.substr i, 1) is '\t'
										ind++
									else
										break
							rind = indent + ind
							rp[1] += "\n#{stimes '\t', indent}#{l.substr ind}"
					if rp[1] and (_.trim rp[1]) and (_.trim rp[1], ' ', '\t', '\r', '\n')
						coffeeScript += "#{rp[1]}"
				else
					sarg = rp[1]
					jarg = null
					if (pos = sarg.indexOf '{') > 0
						jarg = sarg.substr pos
						sarg = _.trim sarg.substr 0, pos
					coffeeScript += "\n#{stimes '\t', rind}parts.push @renderTag #{JSON.stringify rp[0]}, #{JSON.stringify sarg}, #{jarg}"
		coffeeScript += "\n#{stimes '\t', indent}@_html = parts.join ''\n#{stimes '\t', indent - 1}if $el\n#{stimes '\t', indent}$el.html @_html\n#{stimes '\t', indent - 1}@_html\n#{"#endif"}\n"
		coffeeScript
#endif
#if client
	@tagRenderers:
		"arg": (ctl, name) ->
			ctl.args[name]
		"ctl": (ctl, className, args) ->
			if (not ctl.controls[args.id]) and (ctor = smio['Packs_' + ctl.baseName + '_' + className])
				ctl.client.allControls[args.id] = ctl.controls[args.id] = new ctor @client, args
			if ctl.controls[args.id]
				ctl.controls[args.id].renderHtml()
			else
				"!!CONTROL_NOT_FOUND::#{className}!!"
		"r": (ctl, name) ->
			ret = ''
			if (resSets = smio.resources)
				parts = ctl.baseName.split '_'
				for i in [(parts.length - 1)..0]
					if (resSet = resSets[parts[0..i].join '_']) and (ret = resSet[name])
						break
				if not ret
					ret = smio.resources.smoothio[name]
			if ret then ret else name

	constructor: (@client, args, baseName, className) ->
		@args = args
		@ctlID = args.id
		@baseName = baseName
		@className = className
		@controls = {}
		@el = null
		@_html = ''

	id: (subID) ->
		if (subID)
			@ctlID + '_' + subID
		else
			@ctlID

	init: ->

	onLoad: () ->
		@el = $('#' + @ctlID)
		for id, ctl of @controls
			ctl.onLoad()

	renderTag: (name, sarg, jarg) ->
		renderer = smio.Control.tagRenderers[name]
		if renderer
			renderer(@, sarg, jarg)
		else
			"!!UNKNOWN_TAG::#{name}!!"

	syncUpdate: (ctlDesc) ->

#endif

