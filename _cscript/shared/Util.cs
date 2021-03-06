
#if server
_ = require 'underscore'
_.mixin require 'underscore.string'
node_fs = require 'fs'
node_path = require 'path'
node_util = require 'util'
#endif

smio = global.smoothio

class smio.Util

	@Array:
		add: (arr, vals...) ->
			copy = _.clone(arr)
			for v in vals
				copy.push(v)
			copy
		ensure: (arr, vals...) ->
			for v in vals
				if not v in arr
					arr.push(v)
			arr
		ensurePos: (arr, val, pos) ->
			if (pos <= arr.length) and ((index = arr.indexOf(val)) isnt pos)
				if index >= 0
					for v, i in arr
						arr[i] = arr[i + 1]
					arr.length--
				arr.length++
				for i in [(arr.length - 1)...pos]
					arr[i] = arr[i - 1]
				arr[pos] = val
			arr
		in: (val, arr) ->
			val in arr
		removeLast: (arr) ->
			arr[0...(arr.length - 1)]
		toObject: (arr, keyGen, valGen) ->
			obj = {}
			for v, i in arr
				obj[if keyGen then keyGen(v, i) else i] = if valGen then valGen(v, i) else v
			obj

	@DateTime:
		addMinutes: (minutes, dt) ->
			if not dt
				dt = new Date()
			dt.setTime(dt.getTime() + (minutes * 60 * 1000))
			dt
		stringify: (dt) ->
			if not dt
				dt = new Date()
			s = JSON.stringify(dt)
			if _.startsWith(s, '"') and _.endsWith(s, '"') then s.substr(1, s.length - 2) else s
		ticks: (dt) ->
			if not dt
				dt = new Date()
			dt.getTime()
		toString: (dt) ->
			if not dt
				dt = new Date()
			pad = (fn, inc) ->
				v = if (typeof(fn) isnt 'function') then fn else fn.apply(dt)
				if inc? and inc > 0
					v = v + inc
				if "#{v}".length isnt 1 then v else '0' + v
			"#{dt.getFullYear()}-#{pad(dt.getMonth, 1)}-#{pad(dt.getDate)}-#{pad(dt.getHours)}-#{dt.getMinutes()}-#{dt.getSeconds()}"
		utcTicks: (dt) ->
			if not dt
				dt = new Date()
			Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds())

	@Runtime:
		parallel: (funs, finish) ->
			len = funs.length
			done = 0
			checkDone = ->
				if (++done) is len
					finish()
			for fn in funs
				fn(checkDone)

	@Matrix:
		clone: (mat) ->
			copy = mat4.create()
			mat4.set(mat, copy)
			copy
		equals: (mat1, mat2) ->
			if (not mat1) and (not mat2)
				return true
			if (not mat1) or (not mat2) or (mat1.length isnt mat2.length)
				return false
			for i in [0...mat1.length]
				if mat1[i] isnt mat2[i]
					return false
			true

	@Number:
		average: (nums) ->
			sum = 0
			sum = (sum + val) for val in nums
			sum / nums.length
		degToRad: (deg) ->
			deg * Math.PI / 180
		max: () ->
			Math.pow(2, 31) - 1
		min: () ->
			Math.pow(-2, 31)
		randomInt: (max) ->
			Math.floor(Math.random() * (max + 1))
		secant: (n) ->
			1 / Math.cos(n)
		sinh: (n) ->
			(Math.exp(n) - Math.exp(-n)) / 2
		toOtherSign: (test, val) ->
			if test < 0 then Math.abs(val) else if val <= 0 then val else -val
		toSameSign: (test, val) ->
			if test >= 0 then Math.abs(val) else if val <= 0 then val else -val
		tryParse: (val, def, validate) ->
			num = parseInt("#{val}")
			if validate and not validate(num)
				num = def
			if _.isNumber(num) then num else def

	@Object:
		cloneFiltered: (obj, fn) ->
			[noFunc, o] = [not _.isFunction(fn), {}]
			for k, v of obj
				if noFunc or fn(k, v)
					o[k] = v
			o
		empty: (obj) ->
			for p of obj
				return false
			true
		exclude: (obj, keys...) ->
			smio.Util.Object.cloneFiltered(obj, (k, v) -> not (k in keys))
		isObject: (o, checkArr) ->
			(typeof(o) is 'object') and ((not checkArr) or not _.isArray(o))
		mergeDefaults: (cfg, defs) ->
			if not cfg
				cfg = {}
			for defKey, defVal of defs
				if (not cfg[defKey]?) or (typeof(cfg[defKey]) isnt typeof(defVal))
					cfg[defKey] = defVal
				else if (typeof(cfg[defKey]) is 'object') and (typeof(defVal) is 'object')
					cfg[defKey] = smio.Util.Object.mergeDefaults(cfg[defKey], defVal)
			cfg
		select: (obj, path) ->
			parts = if path then path.split('.') else null
			last = if path then obj else null
			if parts and last
				for p in parts
					if not (last = last[p])
						break
			last

	@String:
		namedHtmlEntities: { 'ß': 'szlig', 'ä': 'auml', 'Ä': 'Auml', 'ö': 'ouml', 'Ö': 'Ouml', 'ü': 'uuml', 'Ü': 'Uuml' }
		htmlEncode: (str) ->
			[ret, tmp] = ['', _.escapeHTML(str)]
			len = tmp.length
			for c, i in tmp
				if (ent = smio.Util.String.namedHtmlEntities[c])
					ret += ("&#{ent};")
				else if (cc = tmp.charCodeAt i) > 127
					ret += ("&##{cc};")
				else
					ret += c
			ret
		idify: (str) ->
			smio.Util.String.urlify(str, '', '', true)
		in: (c, s) ->
			c in s
		replace: (str, replace) ->
			for val, repl of replace
				while (pos = str.indexOf(val)) >= 0
					str = str.substr(0, pos) + repl + str.substr(pos + val.length)
			str
		times: (str, times) ->
			a = new Array(times)
			for x in [0...times]
				a[x] = str
			a.join('')
		urlify: (s, e = '-', al = '/', noLower) ->
			[l, o, a, r] = ['', '', '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' + al, 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue', 'ß': 'ss']
			for c in s
				if c in a
					o += (l = c)
				else if (tc = r[c])
					o += (l = tc)
				else if e and (l isnt e)
					o += (l = e)
			tmp = _.trim(o, "/#{e}")
			if noLower then tmp else tmp.toLowerCase()

#if client
	@Geo:
		wgs: new Proj4js.Proj('WGS84')
		epsg: new Proj4js.Proj('EPSG:900913')
		fromMap: (x, y) ->
			Proj4js.transform(smio.Util.Geo.epsg, smio.Util.Geo.wgs, { x: x, y: y })
		toMap: (lon, lat) ->
			Proj4js.transform(smio.Util.Geo.wgs, smio.Util.Geo.epsg, { x: lon, y: lat })
#endif

#if server
	@FileSystem:
		mkdirMode: 0777
		ensureDirs: (srcDirPath, outDirPath) ->
			smio.walkDir srcDirPath, null, null, null, null, null, true, (curDirPath, _, relDirPath) ->
				path = node_path.join(outDirPath, relDirPath)
				if not node_path.existsSync(path = node_path.join(outDirPath, relDirPath))
					node_fs.mkdirSync(path, smio.Util.FileSystem.mkdirMode)
		isPathMatch: (path, pattern) ->
			if (begins = _.startsWith(pattern, '*')) and (ends = _.endsWith(pattern, '*'))
				pattern.substr(1, pattern.length - 2) in path
			else if begins
				_.endsWith(path, pattern.substr(1))
			else if ends
				_.startsWith(path, pattern.substr(0, pattern.length - 1))
			else
				path is pattern
		readTextFile: (path) ->
			node_fs.readFileSync(path, 'utf-8')

	@Server:
		formatError: (err, details, stack) ->
			if details
				lines = []
				for name, val of err
					if name? and val? and name isnt (if stack then 'message' else 'stack')
						lines.push("\t#{name}: #{val}")
				lines.join('\n')
			else if stack and err['stack']?
				(if err['ml_error_filepath']? then ("[ #{err['ml_error_filepath']} ] -- ") else '') + err.stack
			else
				(if err['ml_error_filepath']? then ("[ #{err['ml_error_filepath']} ] -- ") else '') + err
		parseCookies: (cookies) ->
			c = {}
			if cookies
				for cookie in cookies.split(';')
					if (parts = cookie.split('=')) and parts.length
						c[parts[0]] = if (parts.length > 1) then parts[1] else ''
			c
		setupLogFile: (owner, propName, smioBuf, logPath, oldLogFunc) ->
			if logPath
				try
					node_fs.unlinkSync(logPath)
				return (line, cat) ->
					closeLog = () ->
						try
							owner[propName].end()
						try
							owner[propName].destroySoon()
						owner[propName] = null
					full = ''
					if smioBuf and smio['logBuffer']
						full = smio.logBuffer.join('\n') + '\n'
						delete smio.logBuffer
					if owner[propName] and not owner[propName].writable
						closeLog()
					if not owner[propName]
						owner[propName] = node_fs.createWriteStream(logPath, encoding: 'utf-8', mode: 0666)
						owner[propName].on 'close', closeLog
						owner[propName].on 'error', closeLog
					time = JSON.stringify(new Date())
					if _.endsWith(time, '"')
						time = time.substr(0, time.length - 1)
					if _.startsWith(time, '"')
						time = time.substr(1)
					full += (line = time + ' - ' + oldLogFunc(line, cat) + '\n')
					try
						owner[propName].write(full)
#endif

