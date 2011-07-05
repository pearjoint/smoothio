
/*
	smoothio bootstrap script / NodeJS entry point.
	Compiles CoffeeScripts and Stylus sheets, starts monitoring them for changes (if set in instance.config).
	Then runs the main CoffeeScript (_cscript/Instance.cs).
 */

var _ = require('underscore'),
	coffee = require('coffee-script'),
	node_fs = require('fs'),
	node_path = require('path'),
	node_proc = require('child_process'),
	node_util = require('util'),
	uglify = require('uglify-js'),
	smio = (global.smoothio = {}),
	stylus = require('stylus'),
	exitCode = 0,
	lastFilePath = null,
	noLogging = false,
	restartInterval = null,
	watchedFiles = [];

_.mixin(require('underscore.string'));

smio.instName = node_path.basename(process.cwd());
smio.logBuffer = [];
smio.resLangs = [''];

smio.compileCoffeeScripts = function(dirOrFilePath, srvOutDirPath, cltOutDirPath, noWatch, lazyClient, nameIfSource) {
	var files = (nameIfSource || node_fs.statSync(dirOrFilePath).isFile()) ? [null] : node_fs.readdirSync(dirOrFilePath), fileContent, fileContentClient, fileContentServer, javaScript, filePath, lines, consts, ignore, tmp, pos, doClient = !lazyClient;
	for (var i = 0; i < files.length; i++) {
		fileContentServer = '';
		fileContentClient = '';
		consts = null;
		if (!files[i])
			if (nameIfSource)
				files[i] = nameIfSource;
			else {
				files[i] = node_path.basename(dirOrFilePath);
				dirOrFilePath = node_path.dirname(dirOrFilePath);
			}
		if ((nameIfSource || node_fs.statSync(filePath = node_path.join(dirOrFilePath, files[i])).isFile()) && (fileContent = (nameIfSource ? dirOrFilePath : node_fs.readFileSync(filePath, 'utf-8')))) {
			if (!noWatch)
				watchFile(lastFilePath = filePath);
			lines = fileContent.split('\n');
			for (var j = 0; j < lines.length; j++) {
				if (lazyClient && ((lines[j] == '#if client') || (lines[j] == '#if server')))
					doClient = true;
				if (lines[j].indexOf('#const ') == 0) {
					tmp = lines[j].substr(7);
					if (!consts)
						consts = {};
					consts[tmp.substr(0, tmp.indexOf(' '))] = tmp.substr(tmp.indexOf(' ') + 1);
				}
			}
			if (consts)
				for (var cn in consts)
					for (var j = 0; j < lines.length; j++)
						while ((pos = lines[j].indexOf(cn)) >= 0)
							lines[j] = lines[j].substr(0, pos) + consts[cn] + lines[j].substr(pos + cn.length);
			if (srvOutDirPath) {
				ignore = false;
				for (var j = 0; j < lines.length; j++)
					if (lines[j] == '#if client')
						ignore = true;
					else if (lines[j] == '#endif')
						ignore = false;
					else if ((!ignore) && (lines[j].indexOf('#const ') != 0) && (lines[j] != '#if server'))
						fileContentServer += (lines[j] + '\n');
			}
			if (doClient && cltOutDirPath) {
				ignore = false;
				for (var j = 0; j < lines.length; j++)
					if (lines[j] == '#if server')
						ignore = true;
					else if (lines[j] == '#endif')
						ignore = false;
					else if ((!ignore) && (lines[j].indexOf('#const ') != 0) && (lines[j] != '#if client'))
						fileContentClient += (lines[j] + '\n');
			}
			if (srvOutDirPath && fileContentServer && (fileContentServer = _.trim(fileContentServer)) && (javaScript = coffee.compile(fileContentServer)))
				node_fs.writeFileSync(node_path.join(srvOutDirPath, files[i].substr(0, files[i].lastIndexOf('.')) + '.js'), javaScript);
			if (doClient && cltOutDirPath && fileContentClient && (fileContentClient = _.trim(fileContentClient)) && (javaScript = coffee.compile(fileContentClient)))
				node_fs.writeFileSync(node_path.join(cltOutDirPath, files[i].substr(0, files[i].lastIndexOf('.')) + '.js'), javaScript);
		}
	}
}

smio.compileConfigFile = function(filePath, outDirPath) {
	var fileContent, js, fileName = node_path.basename(filePath);
	if ((fileContent = node_fs.readFileSync(filePath, 'utf-8')) && (js = coffee.compile('###\nDo not modify: auto-generated from ((your-instance-folder))/' + filePath + '\n###\nmodule.exports = ' + fileContent)))
		node_fs.writeFileSync(node_path.join(outDirPath, '_cfg_' + fileName.substr(0, fileName.lastIndexOf('.')) + '.js'), js);
}

smio.compileResourceFile = function(filePath, outDirPath) {
	var fileContent, js, fileName = node_path.basename(filePath);
	if ((fileContent = node_fs.readFileSync(filePath, 'utf-8')) && (js = coffee.compile('###\nDo not modify: auto-generated from ((your-instance-folder))/' + filePath + '\n###\nmodule.exports = ' + fileContent)))
		node_fs.writeFileSync(node_path.join(outDirPath, '_res_' + fileName.substr(0, fileName.lastIndexOf('.')) + '.js'), js);
}

smio.iif = function(test, ifTrue, ifFalse) {
	if (arguments.length < 3)
		ifFalse = false;
	if (arguments.length < 2)
		ifTrue = true;
	return test ? ifTrue : ifFalse;
};

smio.logit = function(line, cat) {
	var time;
	line = '[' + smio.instName + (cat ? ('.' + cat) : '') + '] ' + line;
	if (!noLogging) {
		if (smio['logBuffer']) {
			time = JSON.stringify(new Date());
			if (_.endsWith(time, '"'))
				time = time.substr(0, time.length - 1);
			if (_.startsWith(time, '"'))
				time = time.substr(1);
			smio.logBuffer.push(time + ' - ' + line);
		}
		node_util.log(line);
	}
	return line;
}

smio.walkDir = function(dirPath, files, fileFunc, errs, dontRecurse, rootDirPath, folderFuncFirst, folderFunc, allFilesFirst) {
	var subFiles, subPath, isRoot = !rootDirPath, subDirs = [], handleErr = function(err) {
		if (errs && errs['push'])
			errs.push(err);
		else
			throw err;
	};
	if (isRoot)
		rootDirPath = dirPath;
	if (folderFuncFirst && folderFunc && !isRoot)
		try {
			folderFunc(dirPath, rootDirPath, dirPath.substr(rootDirPath.length + 1));
		} catch(err) {
			handleErr(err);
		}
	if (!files)
		files = node_fs.readdirSync(dirPath);
	for (var i = 0, l = files.length; i < l; i++) {
		subFiles = null;
		subPath = node_path.join(dirPath, files[i]);
		try {
			subFiles = node_fs.readdirSync(subPath);
		} catch(err) {
		}
		if (subFiles == null)
			try {
				if (fileFunc)
					fileFunc(subPath, files[i], subPath.substr(rootDirPath.length + 1));
			} catch(err) {
				handleErr(err);
			}
		else if (!dontRecurse)
			if (allFilesFirst)
				subDirs.push([subPath, subFiles]);
			else
				smio.walkDir(subPath, subFiles, fileFunc, errs, false, rootDirPath, folderFuncFirst, folderFunc, allFilesFirst);
	}
	if (subDirs.length)
		for (var i = 0, l = subDirs.length; i <  l; i++)
			smio.walkDir(subDirs[i][0], subDirs[i][1], fileFunc, errs, false, rootDirPath, folderFuncFirst, folderFunc, allFilesFirst);
	if (folderFunc && !(folderFuncFirst || isRoot))
		try {
			folderFunc(dirPath, rootDirPath, dirPath.substr(rootDirPath.length + 1));
		} catch(err) {
			handleErr(err);
		}
}

function clearDirectory(dirPath, removeDirs) {
	smio.walkDir(dirPath, null, node_fs.unlinkSync, null, false, null, false, removeDirs ? node_fs.rmdirSync : null);
}

function compileClientResources(outDirPath, minify, watch) {
	var all = { '': {} }, outScripts = {}, outScript, lk;
	for (var resSet in smio.inst.resourceSets)
		if (resSet != 'server')
			for (var lang in smio.inst.resourceSets[resSet]) {
				lk = ((lang == 'en') ? '' : lang);
				if (!all[lk])
					all[lk] = {};
				if (!all[lk][resSet])
					all[lk][resSet] = {};
				for (var resName in smio.inst.resourceSets[resSet][lang])
					all[lk][resSet][resName] = smio.inst.resourceSets[resSet][lang][resName];
			}
	for (var lang in all)
		if (lang) {
			if (_.indexOf(smio.resLangs, lang) < 0)
				smio.resLangs.push(lang);
			for (var resKey in all[''])
				if (!all[lang][resKey])
					all[lang][resKey] = all[''][resKey];
				else
					for (var rn in all[''][resKey])
						if (!all[lang][resKey][rn])
							all[lang][resKey][rn] = all[''][resKey][rn];
		}
	for (var lang in all)
		for (var resKey in all[lang]) {
			if (!outScripts[lang])
				outScripts[lang] = [];
			outScripts[lang].push(resKey + ':' + JSON.stringify(all[lang][resKey]));
		}
	for (var lang in outScripts) {
		outScript = "smio.resources={" + outScripts[lang].join(',\n') + "};";
		if (minify)
			outScript = minifyJs(outScript);
		node_fs.writeFileSync(node_path.join(outDirPath, '_res' + (lang ? ('.' + lang) : '') + '.js'), outScript);
	}
}

function compileStylusSheets(dirPath, outDirPath) {
	var files = node_fs.readdirSync(dirPath), fileContent, filePath;
	for (var i = 0; i < files.length; i++) {
		if ((!_.startsWith(files[i], '_')) && node_fs.statSync(filePath = node_path.join(dirPath, files[i])).isFile() && (fileContent = node_fs.readFileSync(filePath, 'utf-8'))) {
			watchFile(filePath);
			stylus(fileContent).set('filename', filePath).render((function(index, fp) {
				return function(err, css) {
					if (err) {
						err.ml_error_filepath = fp;
						smio.logit('STYLUS ERROR for ' + files[index] + ': ' + JSON.stringify(err));
					} else if (css)
						node_fs.writeFileSync(node_path.join(outDirPath, files[index].substr(0, files[index].lastIndexOf('.')) + '.css'), css);
				};
			})(i, filePath));
		}
	}
}

function mergeFiles(ext, outFilePath, dirPaths, minify, sorted) {
	var outc = '', allPaths = {}, fn = function(filePath) {
		if (filePath.indexOf('_ctl_Smoothio') < 0)
			outc += ('/** ' + filePath + ' **/\n' + node_fs.readFileSync(filePath, 'utf-8') + '\n');
	};
	if (!dirPaths)
		dirPaths = ['server/pub'];
	for (var i = 0, l = dirPaths.length; i < l; i++) {
		if (sorted)
			allPaths[dirPaths[i]] = [];
		smio.walkDir(dirPaths[i], null, function(filePath, fileName) {
			var lastPos;
			if ((filePath != outFilePath) && ((lastPos = filePath.lastIndexOf(ext)) == (filePath.length - ext.length)))
				if (sorted)
					allPaths[dirPaths[i]].push(filePath.substr(0, lastPos).substr(dirPaths[i].length + 1));
				else
					fn(filePath);
		}, null, false, null, false, null, true);
		if (sorted)
			allPaths[dirPaths[i]] = allPaths[dirPaths[i]].sort();
	}
	if (sorted)
		for (var dirPath in allPaths)
			for (var i = 0, l = allPaths[dirPath].length; i < l; i++)
				fn(node_path.join(dirPath, allPaths[dirPath][i] + ext));
	if (outc) {
		if (minify)
			if (ext == '.css')
				outc = minifyCss(outc);
			else if (ext == '.js')
				outc = minifyJs(outc);
		node_fs.writeFileSync(outFilePath, outc);
	}
}

function minifyCss(outc) {
	var mini = '', inqd = false, inqs = false, inc = false, inb = false, inr = false, lc = '', lr = '', c, skips = ['\t', '\r', '\n'];
	for (var i = 0, l = outc.length; i < l; i++) {
		c = outc.substr(i, 1);
		if ((c == '"') && !inqs)
			inqd = !inqd;
		if ((c == "'") && !inqd)
			inqs = !inqs;
		if ((!inqs) && (!inqd) && (!inc) && (c == '/') && (i < (l - 1)) && (outc.substr(i + 1, 1) == '*'))
			inc = true;
		if ((!inqs) && (!inqd) && (!inc) && (c == '{')) {
			inb = true;
			mini = _.trim(mini);
		}
		if (inb && (!(inr || inqs || inqd || inc)) && (c == ':'))
			inr = true;
		if ((!inc) && (inqd || inqs || (_.indexOf(skips, c) < 0)) && ((c != ' ') || inqd || inqs || (!inb) || (inr && (lr != ':'))))
			mini += c;
		if (inb && inr && (!(inqs || inqd || inc)) && (c == ';'))
			inr = false;
		if ((!inqs) && (!inqd) && (lc == '*') && (c == '/') && inc)
			inc = false;
		if ((!inqs) && (!inqd) && (c == '}') && inb)
			inb = false;
		lc = c;
		if ((c != ' ') && (_.indexOf(skips, c) < 0))
			lr = c;
	}
	return mini;
}

function minifyJs(outc) {
	var mini = uglify.uglify;
	return mini.gen_code(mini.ast_squeeze(mini.ast_mangle(uglify.parser.parse(outc))));
}

function onFileChange(cur, prev) {
	if ((!restartInterval) && smio.inst) {
		smio.logit("A monitored file has changed. Shutting down servers...");
		exitCode = 1000;
		smio.inst.stop();
		restartInterval = setInterval(restartSmoothio, 250);
	}
}

function restartSmoothio() {
	if (smio.inst.haveAllStopped()) {
		clearInterval(restartInterval);
		restartInterval = null;
		smio.logit("Shutdown of all servers completed" + ((exitCode == 1000) ? '; restarting...' : '.') + "\n");
		if (smio.inst.logFile) {
			try {
				smio.inst.logFile.end();
			} catch(err) {
			}
			try {
				smio.inst.logFile.destroy();
			} catch(err) {
			}
			smio.inst.logFile = null;
		}
		process.exit(exitCode); // exit code != 1 and != 0 signals to SmoothioDaemon to restart
	} /*else
		smio.logit("Still waiting...");*/
}

function startSmoothio() {
	var startTime = new Date().getTime(),
		coffeeDone = false,
		hasCoffee = node_path.existsSync('../_cscript'),
		hasStylus = node_path.existsSync('../_core/stylus'),
		returnCode = 1,
		watchExtensions = ['res', 'ccfg', 'config', 'ctl', 'styl', 'cs'],
		watchSelective = function(fpath) {
			for (var i = 0; i < watchExtensions.length; i++)
				if (fpath.indexOf(watchExtensions[i]) == (fpath.length - watchExtensions[i].length))
					watchFile(fpath);
		};
	node_util.log('INIT...');
	clearDirectory('server/_packs', true);
	clearDirectory('server/pub/_packs', true);
	clearDirectory('server/pub/_merged', true);
	if (hasCoffee) {
		clearDirectory('server/_jscript');
		clearDirectory('server/pub/_scripts');
	}
	smio.compileConfigFile('instance.ccfg', 'server/_jscript');
	smio.walkDir('../_core/res', null, function(filePath, fileName, relFilePath) {
		if (_.endsWith(fileName, '.cres'))
			smio.compileResourceFile(filePath, 'server/_jscript');
	});
	if (hasStylus) {
		clearDirectory('server/pub/_styles');
		smio.logit('Compiling Stylus sheets...');
		compileStylusSheets('../_core/stylus', 'server/pub/_styles');
	}
	if (hasCoffee)
		try {
			smio.logit('Compiling CoffeeScripts...');
			smio.compileCoffeeScripts('../_cscript', 'server/_jscript');
			smio.compileCoffeeScripts('../_cscript/shared', 'server/_jscript/shared', 'server/pub/_scripts/shared');
			smio.compileCoffeeScripts('../_cscript/client', 'server/pub/_scripts');
			coffeeDone = true;
		} catch (err) {
			err.ml_error_filepath = lastFilePath;
			smio.logit('CoffeeScript compilation ERROR:\n' + JSON.stringify(err));
		}
	if (coffeeDone || !hasCoffee) {
		require('./server/_jscript/Instance');
		if ((smio.inst = new smio.Instance()) && ((returnCode = smio.inst.start()) < 0)) {
			smio.logit('Merging client scripts and style sheets...');
			mergeFiles('.css', 'server/pub/_merged/_smoothio.css', ['server/pub/_styles', 'server/pub/_packs'], smio.inst.config.smoothio.minify);
			mergeFiles('.js', 'server/pub/_merged/_smoothio.js', ['../_core/scripts', 'server/pub/_scripts', 'server/pub/_packs'], smio.inst.config.smoothio.minify, true);
			compileClientResources('server/pub/_merged', smio.inst.config.smoothio.minify, smio.inst.autoRestart);
			if (smio.inst.autoRestart) {
				smio.walkDir('../_core/packs', null, watchSelective);
				smio.walkDir('packs', null, watchSelective);
				smio.walkDir('server', null, watchSelective);
			} else {
				for (var i = 0; i < watchedFiles.length; i++)
					node_fs.unwatchFile(watchedFiles[i]);
				watchedFiles = [];
			}
			watchFile('instance.config');
			smio.logit('STARTUP TOOK ' + ((new Date().getTime() - startTime) / 1000) + ' SECONDS.');
		} else {
			smio.inst = null;
			process.exit(returnCode);
		}
	}  else
			process.exit(returnCode);
}

function stopSmoothio() {
	if ((!restartInterval) && smio.inst) {
		smio.logit("Shutting down servers...");
		smio.inst.stop();
		restartInterval = setInterval(restartSmoothio, 250);
	} else
		process.exit(exitCode);
}

function watchFile(filePath) {
	if (watchedFiles.indexOf(filePath) < 0) {
		watchedFiles.push(filePath);
		node_fs.watchFile(filePath, { "persistent": true, interval: 1000 }, onFileChange);
	}
}

process.on('uncaughtException', function (err) {
	smio.logit('ERROR unhandled:\n' + JSON.stringify(err));
	exitCode = (smio.inst && smio.inst.restartMinUptime && (smio.inst.getUptime() >= smio.inst.restartMinUptime)) ? 1000 : 1;
	stopSmoothio();
});
process.on('SIGINT', stopSmoothio);
process.on('SIGTERM', stopSmoothio);
startSmoothio();

