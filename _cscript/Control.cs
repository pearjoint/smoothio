
node_util = require 'util'
smio = global.smoothio

class smio.Control
	@compile: (@inst, ctlContent, controlPath) ->
		[inDyn, oneUp, contentParts, lastChar, lastContent, obj] = [false, '../', [], '', '', {}]
		pathParts = ((controlPath.substr 0, controlPath.lastIndexOf '.').split '/')
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
		#smio.logit "\n\n\n#{JSON.stringify contentParts}\n\n\n"
		coffeeScript = """
###
Auto-generated
###
require '#{@inst.util.string.times oneUp, pathParts.length}_jscript/Control'
smio = smoothio = global.smoothio
class smio.Packs_#{className} extends smio.Control
	constructor: ->
		x = ""
"""
		coffeeScript

	constructor: ->
		x = ""

