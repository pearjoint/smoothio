
#if server
node_fs = require 'fs'
node_path = require 'path'
node_util = require 'util'
#endif

smio = global.smoothio

class smio.Util
	constructor: ->
		@array = {}
		@array.ensurePos = (arr, val, pos) ->
			if pos <= arr.length and (index = arr.indexOf val) isnt pos
				if index >= 0
					for i in [index...arr.length]
						arr[i] = arr[i + 1]
					arr.length--
				arr.length++
				for i in [(arr.length - 1)...pos]
					arr[i] = arr[i - 1]
				arr[pos] = val
			arr
		@array.toObject = (arr, keyGen) ->
			obj = {}
			for v, i in arr
				obj[keyGen(v, i)] = v
			obj

#if server
		@fs = {}
		@fs.mkdirMode = 0777
		@fs.ensureDirs = (srcDirPath, outDirPath) ->
			smio.walkDir srcDirPath, null, null, null, null, null, true, (curDirPath, _, relDirPath) =>
				path = node_path.join outDirPath, relDirPath
				if not node_path.existsSync path = node_path.join outDirPath, relDirPath
					node_fs.mkdirSync path, @mkdirMode
		@fs.isPathMatch = (path, pattern) =>
			if (begins = @string.beginsWith pattern, '*') and (ends = @string.endsWith pattern, '*')
				path.indexOf (pattern.substr 1, pattern.length - 2) >= 0
			else if begins
				@string.endsWith path, pattern.substr 1
			else if ends
				@string.beginsWith path, (pattern.substr 0, pattern.length - 1)
			else
				path is pattern
		@fs.readTextFile = (path) ->
			node_fs.readFileSync path, 'utf-8'
#endif

		@string = {}
		@string.beginsWith = (str, val) ->
			(str.indexOf val) is 0
		@string.endsWith = (str, val) ->
			(str.length >= val.length) and ((pos = str.indexOf val) >= 0) and (pos is str.length - val.length)
		@string.replace = (str, replace) ->
			for val, repl of replace
				while (pos = str.indexOf val) >= 0
					str = (str.substr 0, pos) + repl + (str.substr pos + val.length)
			str
		@string.times = (str, times) ->
			s = ''
			(s = s + str) for x in [0...times]
			s

#if server
	formatDate: (dt) ->
		pad = (fn, inc) ->
			v = if typeof fn isnt 'function' then fn else fn.apply dt
			v = v + inc if inc? and inc > 0
			if (v + '').length isnt 1 then v else '0' + v
		"#{dt.getFullYear()}-#{pad dt.getMonth, 1}-#{pad dt.getDate}-#{pad dt.getHours}-#{dt.getMinutes()}-#{dt.getSeconds()}"

	formatError: (err, details, stack) ->
		if details
			lines = []
			for name, val of err
				if name? and val? and name isnt (if stack then 'message' else 'stack')
					lines.push "\t#{name}: #{val}"
			lines.join '\n'
		else if stack and err['stack']?
			(if err['ml_error_filepath']? then ('[ ' + err['ml_error_filepath'] + ' ] -- ') else '') + err.stack
		else
			(if err['ml_error_filepath']? then ('[ ' + err['ml_error_filepath'] + ' ] -- ') else '') + err

	mergeConfigWithDefaults: (cfg, defs) ->
		for defKey, defVal of defs
			if (not cfg[defKey]?) or (typeof cfg[defKey] isnt typeof defVal)
				cfg[defKey] = defVal
			else if (typeof cfg[defKey] is 'object') and (typeof defVal is 'object')
				cfg[defKey] = @mergeConfigWithDefaults cfg[defKey], defVal
		cfg
#endif

	randomInt: (max) ->
		Math.floor Math.random() * (max + 1)

	trueForAll: (args) ->
		for v in args
			if not v
				return false
		true

	trueForSome: (args) ->
		for v in args
			if v
				return true
		false

