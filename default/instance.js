
/*
	smoothio bootstrap script / NodeJS entry point.
	Compiles CoffeeScripts and Stylus sheets, starts monitoring them for changes (if set in instance.config).
	Then runs the main CoffeeScript.
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

smio.compileCoffeeScripts = function(dirOrFilePath, srvOutDirPath, cltOutDirPath, noWatch, lazyClient, nameIfSource) {
	var files = (nameIfSource || node_fs.statSync(dirOrFilePath).isFile()) ? [null] : node_fs.readdirSync(dirOrFilePath), fileContent, fileContentClient = '', fileContentServer = '', javaScript, filePath, lines, ignore, doClient = !lazyClient;
	for (var i = 0; i < files.length; i++) {
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
			if (lazyClient)
				for (var j = 0; j < lines.length; j++)
					if (doClient = ((lines[j] == '#if client') || (lines[j] == '#if server')))
						break;
			if (srvOutDirPath) {
				ignore = false;
				for (var j = 0; j < lines.length; j++)
					if (lines[j] == '#if client')
						ignore = true;
					else if (lines[j] == '#endif')
						ignore = false;
					else if (!ignore)
						fileContentServer += (lines[j] + '\n');
			}
			if (doClient && cltOutDirPath) {
				ignore = false;
				for (var j = 0; j < lines.length; j++)
					if (lines[j] == '#if server')
						ignore = true;
					else if (lines[j] == '#endif')
						ignore = false;
					else if (!ignore)
						fileContentClient += (lines[j] + '\n');
			}
			if (srvOutDirPath && (javaScript = coffee.compile(fileContentServer)))
				node_fs.writeFileSync(node_path.join(srvOutDirPath, files[i].substr(0, files[i].lastIndexOf('.')) + '.js'), javaScript);
			if (doClient && cltOutDirPath && (javaScript = coffee.compile(fileContentClient)))
				node_fs.writeFileSync(node_path.join(cltOutDirPath, files[i].substr(0, files[i].lastIndexOf('.')) + '.js'), javaScript);
		}
	}
}

smio.logit = function(line, cat) {
	line = '[' + smio.instName + (cat ? ('.' + cat) : '') + '] ' + line;
	if (!noLogging) {
		if (smio['logBuffer'])
			smio.logBuffer.push(JSON.stringify(new Date()) + ' - ' + line);
		node_util.log(line);
	}
	return line;
}

smio.walkDir = function(dirPath, files, fileFunc, errs, dontRecurse, rootDirPath, folderFuncFirst, folderFunc, allFilesFirst) {
	var subFiles, subPath, isRoot = !rootDirPath, subDirs = [];
	if (isRoot)
		rootDirPath = dirPath;
	if (folderFuncFirst && folderFunc && !isRoot)
		folderFunc(dirPath, rootDirPath, dirPath.substr(rootDirPath.length + 1));
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
				if (errs && errs['push'])
					errs.push(err);
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
		folderFunc(dirPath, rootDirPath, dirPath.substr(rootDirPath.length + 1));
}

function clearDirectory(dirPath, removeDirs) {
	smio.walkDir(dirPath, null, node_fs.unlinkSync, null, false, null, false, removeDirs ? node_fs.rmdirSync : null);
}

function compileStylusSheets(dirPath, outDirPath) {
	var files = node_fs.readdirSync(dirPath), fileContent, filePath;
	for (var i = 0; i < files.length; i++) {
		if (node_fs.statSync(filePath = node_path.join(dirPath, files[i])).isFile() && (fileContent = node_fs.readFileSync(filePath, 'utf-8'))) {
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

function mergeFiles(ext, outFilePath, dirPaths, minify) {
	var outc = '';
	if (!dirPaths)
		dirPaths = ['server/pub'];
	for (var i = 0, l = dirPaths.length; i < l; i++)
		smio.walkDir(dirPaths[i], null, function(filePath) {
			if ((filePath != outFilePath) && (filePath.lastIndexOf(ext) == (filePath.length - ext.length)))
				outc += ('/** ' + filePath + ' **/\n' + node_fs.readFileSync(filePath, 'utf-8') + '\n');
		}, null, false, null, false, null, true);
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
	} else
		smio.logit("Still waiting...");
}

function startSmoothio() {
	var coffeeDone = false,
		hasCoffee = node_path.existsSync('../_cscript'),
		hasStylus = node_path.existsSync('../_core/stylus'),
		returnCode = 1,
		watchExtensions = ['res', 'config', 'ctl', 'styl', 'cs'],
		watchSelective = function(fpath) {
			for (var i = 0; i < watchExtensions.length; i++)
				if (fpath.indexOf(watchExtensions[i]) == (fpath.length - watchExtensions[i].length))
					watchFile(fpath);
		};
	node_util.log('INIT...');
	clearDirectory('server/_packs', true);
	clearDirectory('server/pub/_packs', true);
	if (hasCoffee) {
		clearDirectory('server/_jscript');
		clearDirectory('server/pub/_scripts');
	}
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
			mergeFiles('.css', 'server/pub/_smoothio.css', ['server/pub/_styles', 'server/pub/_packs'], smio.inst.config.smoothio.minify);
			mergeFiles('.js', 'server/pub/_smoothio.js', ['../_core/scripts', 'server/pub/_scripts', 'server/pub/_packs'], smio.inst.config.smoothio.minify);
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

