###
Auto-generated from Core/Controls/Smoothio.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_Smoothio extends smio.Control

	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_Smoothio"

	classNamespace: ->
		"Core_Controls"
	renderHtml: ($el) =>
		__r = ctls: [], m: []
		__r.p = ((r) -> (v) -> r.o.push v) __r
		__r.o = __r.m

		__r.p "<!DOCTYPE html>\n<html lang=\""
		__r.p @renderTag "arg", "lang", null
		__r.p "\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n\t\t<meta name=\"generator\" content=\"smooth.io\"/>\n\t\t<meta name=\"application-name\" content=\""
		__r.p @renderTag "arg", "appname", null
		__r.p "\"/>\n\t\t<meta http-equiv=\"X-UA-Compatible\" content=\"chrome=1\"/>\n\t\t<title>"
		__r.p @renderTag "arg", "title", null
		__r.p "</title>\n\t\t<script type=\"text/javascript\" language=\"JavaScript\">\n\t\t\tvar smio;\n\n\t\t\tfunction onSmoothioNoCookie() {\n\t\t\t\t$('#smio_offline').hide();\n\t\t\t\t$('#smio_body').css({ \"background-image\": \"none\" }).html('<br/><br/><br/><br/><hr/>Either your session cookie expired or you have disabled browser cookies, and hence this application will not load.<br/><br/>Verify that cookies are enabled in your web browser, then try a complete reload (press CTRL+R).<hr/>Entweder ist Ihr Sitzungscookie abgelaufen oder Ihr Webbrowser unterst&uuml;tzt keine Cookies, und somit wird auch diese Anwendung nicht geladen.<br/><br/>Stellen Sie sicher, da&szlig; Ihr Webbrowser Cookies erlaubt, und versuchen Sie dann ein Komplett-Neuladen (STRG+R).<hr/>');\n\t\t\t}\n\n\t\t\tfunction onSmoothioPageLoad() {\n\t\t\t\t$('#smio_noscript, #smio_prescript, #smio_noscript_content').remove();\n\t\t\t\tif (smio)\n\t\t\t\t\tif (smio.pageLoadError)\n\t\t\t\t\t\tdocument.getElementById('smio_body').innerHTML = '<br/><br/><br/><br/><hr/>Required core script <b>' + smio.pageLoadError + '</b> could not be loaded and hence this application will not load.<br/><br/>Try a complete reload (press CTRL+R) as this was probably just a temporary disruption.<hr/>Erforderliches Kernscript <b>' + smio.pageLoadError + '</b> konnte nicht geladen werden und somit wird auch diese Anwendung nicht geladen.<br/><br/>Versuchen Sie ein Komplett-Neuladen (STRG+R), da dies wahrscheinlich nur eine kurzzeitige St&ouml;rung war.<hr/>';\n\t\t\t\t\telse if (!(smio.client = new smio.Client()).sessionID)\n\t\t\t\t\t\tonSmoothioNoCookie();\n\t\t\t\t\telse\n\t\t\t\t\t\tsmio.client.init();\n\t\t\t}\n\n\t\t\tfunction onSmoothioSleepy(sleepy) {\n\t\t\t\tif (smio && smio.client && smio.client.socket && (sleepy != smio.client.sleepy))\n\t\t\t\t\tsmio.client.socket.onSleepy(smio.client.sleepy = sleepy);\n\t\t\t}\n\n\t\t\tfunction onScriptError(scriptName) {\n\t\t\t\tif (smio)\n\t\t\t\t\tsmio.pageLoadError = scriptName;\n\t\t\t}\n\t\t</script>\n\t\t<link rel=\"stylesheet\" href=\"/_/file/_merged/_smoothio.css\"/>\n\t\t<link rel=\"shortcut icon\" type=\"image/png\" id=\"smio_favicon\" href=\"/_/file/images/smoothio.png\" />\n\t\t<style type=\"text/css\"> span.smio-noscript { display: none; } </style>\n\t</head>\n\t<body id=\"smio_body\" onload=\"onSmoothioPageLoad();\" onblur=\"onSmoothioSleepy(true);\" onfocus=\"onSmoothioSleepy(false);\">\n\t\t<div id=\"smio_offline\" class=\"smio-offline\"><span id=\"smio_offline_msg\">"
		__r.p @renderTag "r", "maintemplate_loading", null
		__r.p "</span>&nbsp;<span class=\"smio-blink\">&#x273F;</span></div>\n\t\t<script type=\"text/javascript\" language=\"JavaScript\" id=\"smio_prescript\">\n\t\t\tdocument.getElementById('smio_offline').style.display = 'block';\n\t\t\tvar smioGlobalTest;\n\t\t\ttry {\n\t\t\t\tsmioGlobalTest = global;\n\t\t\t} catch(err) {\n\t\t\t}\n\t\t\tif (!smioGlobalTest)\n\t\t\t\tglobal = {};\n\t\t\tif (!global['smoothio'])\n\t\t\t\tglobal['smoothio'] = {}\n\t\t\tsmio = global.smoothio;\n\t\t\tsmio.pageLoadError = null;\n\t\t\tsmio.iif = function(c, t, f) {\n\t\t\t\tif (arguments.length < 3) f = false;\n\t\t\t\tif (arguments.length < 2) t = true;\n\t\t\t\treturn c ? t : f;\n\t\t\t};\n\t\t</script>\n\t\t<noscript id=\"smio_noscript\">\n\t\t\t<style type=\"text/css\"> span.smio-noscript { display: block !important; } </style>\n\t\t</noscript>\n\t\t<div id=\"smio_main\" class=\"smio-main\"><span class=\"smio-noscript\" id=\"smio_noscript_content\">"
		__r.p @renderTag "arg", "htmlContent", null
		__r.p "</span></div>\n\t\t<script type=\"text/javascript\" language=\"JavaScript\" src=\"/_/dynfile/?config=_res.js\" onerror=\"onScriptError('_res.js');\" defer=\"defer\" async=\"async\"></script>\n\t\t<script type=\"text/javascript\" language=\"JavaScript\" src=\"/_/file/_merged/_smoothio.js\" onerror=\"onScriptError('_smoothio.js');\" defer=\"defer\" async=\"async\"></script>\n\t\t<!--xscript type=\"text/javascript\" language=\"JavaScript\" src=\"/_/file/coffee-script.js\" onerror=\"onScriptError('coffee-script.js');\" defer=\"defer\" async=\"async\"></xscript-->\n\t</body>\n</html>\n"
		_html = __r.o.join ''
		if $el
			$el.html _html
		_html
