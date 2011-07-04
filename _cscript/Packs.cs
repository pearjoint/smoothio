
_ = require 'underscore'
_.mixin require 'underscore.string'
coffee = require 'coffee-script'
node_fs = require 'fs'
node_path = require 'path'
node_util = require 'util'
stylus = require 'stylus'

require './shared/Control'
smio = global.smoothio

class smio.Pack

	constructor: (@inst, @packs, @packPath, @packName) ->
		@loaded = false
		@loadError = null
		@dependsOn = {}
		@config = {}

	load: =>
		if (not @loaded) and (not @loadError?)
			try
				@inst.loadResourceSets @packPath, true, (fpath, fname, relpath) =>
					parts = [@packName]
					if relpath.indexOf('/') > 0
						parts.push(smio.Util.Array.removeLast(relpath.split('/')))
					if fname isnt 'pack'
						parts.push(fname)
					parts.join('_')
				dontCopy = ['*.ccfg', '*.cres']
				smio.logit(@inst.r('log_pack_loading', @packName), 'packs.' + @packName)
				lastFilePath = node_path.join(@packPath, 'pack.ccfg')
				smio.compileConfigFile(lastFilePath, "server/_packs/#{@packName}")
				@config = smio.Util.Object.mergeDefaults(require("../_packs/#{@packName}/_cfg_pack"), pack: dontcopy: dontCopy)
				smio.Util.Array.ensure @config.pack.dontcopy, dontCopy...
				if @config.pack['depends_on']? and @config.pack.depends_on.length
					for dep in @config.pack.depends_on	
						@dependsOn[dep] = pack = @packs.all[dep]
						if (not pack?)
							throw new Error(@inst.r('log_pack_error_depends1', dep))
						if (not pack.loaded)
							if not pack.loadError?
								pack.load()
							if pack.loadError
								throw new Error(@inst.r('log_pack_error_depends2', dep))
				smio.walkDir @packPath, null, (fpath, fname, relPath) =>
					outDirPathClient = node_path.join("server/pub/_packs/#{@packName}", relPath.substr(0, relPath.lastIndexOf('/')))
					outDirPathServer = node_path.join("server/_packs/#{@packName}", relPath.substr(0, relPath.lastIndexOf('/')))
					if _.endsWith(fname, '.styl') and (stylContent = smio.Util.FileSystem.readTextFile(fpath))
						lastFilePath = fpath
						mixinPath = node_path.resolve('../_core/stylus/_mixin')
						stylus("@import '#{mixinPath}'\n#{stylContent}").set('filename', fpath).render (err, css) =>
							if err
								err['ml_error_filepath'] = fpath
								smio.logit(@inst.r('log_pack_error_compile', fpath, @inst.formatError(err)), 'packs.' + @packName)
							else if css
								node_fs.writeFileSync(node_path.join(outDirPathClient, "_styl_" + fname.substr(0, fname.lastIndexOf('.')) + '.css'), css)
					else if _.endsWith(fname, '.cs')
						smio.compileCoffeeScripts(fpath, outDirPathServer, outDirPathClient, true, true)
					else if _.endsWith(fname, '.ctl') and (tmplContent = smio.Util.FileSystem.readTextFile(fpath))
						lastFilePath = fpath
						if (ccsContent = smio.Control.compile(@inst, tmplContent, node_path.join(@packName, relPath)))
							node_fs.writeFileSync(node_path.join(outDirPathServer, "_ctl_" + fname.substr(0, fname.lastIndexOf('.')) + '.cs'), ccsContent)
							smio.compileCoffeeScripts(ccsContent, outDirPathServer, outDirPathClient, true, false, "_ctl_" + fname)
					else
						if not _.any((smio.Util.FileSystem.isPathMatch(fname, pattern) for pattern in @config.pack.dontcopy))
							node_fs.linkSync(fpath, node_path.join(outDirPathClient, fname))
				smio.logit(@inst.r('log_pack_loaded', @packName), 'packs.' + @packName)
				@loaded = true
			catch err
				if (not err['ml_error_filepath']?) and lastFilePath?
					err['ml_error_filepath'] = lastFilePath
				@loadError = err
				smio.logit(@inst.r('log_pack_error_notloaded', @packName, @inst.formatError(err)), 'packs.' + @packName)

class smio.Packs

	constructor: (@inst) ->
		@all = {}
		smio.Util.FileSystem.ensureDirs('../_core/packs', 'server/pub/_packs')
		smio.Util.FileSystem.ensureDirs('../_core/packs', 'server/_packs')
		smio.Util.FileSystem.ensureDirs('packs', 'server/pub/_packs')
		smio.Util.FileSystem.ensureDirs('packs', 'server/_packs')
		for p in smio.Util.Array.ensurePos(node_fs.readdirSync('../_core/packs'), 'Core', 0)
			if node_fs.statSync(pp = node_path.join('../_core/packs', p)).isDirectory()
				@all[p] = new smio.Pack(@inst, @, pp, p)
		for p in node_fs.readdirSync('packs')
			if node_fs.statSync(pp = node_path.join('packs', p)).isDirectory()
				@all[p] = new smio.Pack(@inst, @, pp, p)
		if @corePack = @all['Core']
			for p, pack of @all
				pack.load()

