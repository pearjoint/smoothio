
#if server
_ = require 'underscore'
_.mixin require 'underscore.string'
node_fs = require 'fs'
node_path = require 'path'
node_util = require 'util'
#endif

smio = global.smoothio

class smio.Util
	constructor: ->
		@array =
			ensurePos: (arr, val, pos) ->
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
			toObject: (arr, keyGen) ->
				obj = {}
				for v, i in arr
					obj[keyGen(v, i)] = v
				obj

		@datetime =
			toString: (dt) ->
				pad = (fn, inc) ->
					v = if typeof fn isnt 'function' then fn else fn.apply dt
					v = v + inc if inc? and inc > 0
					if (v + '').length isnt 1 then v else '0' + v
				"#{dt.getFullYear()}-#{pad dt.getMonth, 1}-#{pad dt.getDate}-#{pad dt.getHours}-#{dt.getMinutes()}-#{dt.getSeconds()}"

#if server
		@fs =
			mkdirMode: 0777
			ensureDirs: (srcDirPath, outDirPath) ->
				smio.walkDir srcDirPath, null, null, null, null, null, true, (curDirPath, _, relDirPath) =>
					path = node_path.join outDirPath, relDirPath
					if not node_path.existsSync path = node_path.join outDirPath, relDirPath
						node_fs.mkdirSync path, @mkdirMode
			isPathMatch: (path, pattern) =>
				if (begins = _.isStartsWith pattern, '*') and (ends = _.isEndsWith pattern, '*')
					path.indexOf (pattern.substr 1, pattern.length - 2) >= 0
				else if begins
					_.isEndsWith path, pattern.substr 1
				else if ends
					_.isStartsWith path, (pattern.substr 0, pattern.length - 1)
				else
					path is pattern
			readTextFile: (path) ->
				node_fs.readFileSync path, 'utf-8'

		@inst =
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
				if not cfg
					cfg = {}
				for defKey, defVal of defs
					if (not cfg[defKey]?) or (typeof cfg[defKey] isnt typeof defVal)
						cfg[defKey] = defVal
					else if (typeof cfg[defKey] is 'object') and (typeof defVal is 'object')
						cfg[defKey] = @mergeConfigWithDefaults cfg[defKey], defVal
				cfg
			parseCookies: (cookies) ->
				c = {}
				if cookies
					for cookie in cookies.split ';'
						if (parts = cookie.split '=') and parts.length
							c[parts[0]] = if parts.length > 1 then parts[1] else ''
				c
#endif

		@math =
			randomInt: (max) ->
				Math.floor Math.random() * (max + 1)

		@string =
			replace: (str, replace) ->
				for val, repl of replace
					while (pos = str.indexOf val) >= 0
						str = (str.substr 0, pos) + repl + (str.substr pos + val.length)
				str
			times: (str, times) ->
				a = new Array times
				(a[x] = str) for x in [0...times]
				a.join ''

