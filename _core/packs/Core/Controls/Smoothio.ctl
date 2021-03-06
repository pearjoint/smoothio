<!DOCTYPE html>
<html lang="<%arg:lang%>">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="generator" content="smooth.io"/>
		<meta name="application-name" content="<%arg:appname%>"/>
		<meta http-equiv="X-UA-Compatible" content="chrome=1"/>
		<title><%arg:title%></title>
		<script type="text/javascript" language="JavaScript">
			var smio;

			function onSmoothioNoCookie() {
				$('#smio_offline').hide();
				$('#smio_body').css({ "background-image": "none" }).html('<br/><br/><br/><br/><hr/>Either your session cookie expired or you have disabled browser cookies, and hence this application will not load.<br/><br/>Verify that cookies are enabled in your web browser, then try a complete reload (press CTRL+R).<hr/>Entweder ist Ihr Sitzungscookie abgelaufen oder Ihr Webbrowser unterst&uuml;tzt keine Cookies, und somit wird auch diese Anwendung nicht geladen.<br/><br/>Stellen Sie sicher, da&szlig; Ihr Webbrowser Cookies erlaubt, und versuchen Sie dann ein Komplett-Neuladen (STRG+R).<hr/>');
			}

			function onSmoothioPageLoad() {
				$('#smio_noscript, #smio_prescript, #smio_noscript_content').remove();
				if (smio)
					if (smio.pageLoadError)
						document.getElementById('smio_body').innerHTML = '<br/><br/><br/><br/><hr/>Required core script <b>' + smio.pageLoadError + '</b> could not be loaded and hence this application will not load.<br/><br/>Try a complete reload (press CTRL+R) as this was probably just a temporary disruption.<hr/>Erforderliches Kernscript <b>' + smio.pageLoadError + '</b> konnte nicht geladen werden und somit wird auch diese Anwendung nicht geladen.<br/><br/>Versuchen Sie ein Komplett-Neuladen (STRG+R), da dies wahrscheinlich nur eine kurzzeitige St&ouml;rung war.<hr/>';
					else if (!(smio.client = new smio.Client()).sessionID)
						onSmoothioNoCookie();
					else
						smio.client.init();
			}

			function onSmoothioSleepy(sleepy) {
				if (smio && smio.client && (sleepy != smio.client.sleepy)) {
					smio.client.sleepy = sleepy;
					if (smio.client.socket)
						smio.client.socket.onSleepy(sleepy);
					for (var cid in smio.client.allControls)
						smio.client.allControls[cid].onSleepy(sleepy);
				}
			}

			function onScriptError(scriptName) {
				if (smio)
					smio.pageLoadError = scriptName;
			}
		</script>
		<link rel="stylesheet" href="/_/file/_merged/_smoothio.css?r=<%= smio.Util.Number.randomInt(999999)%>"/>
		<link rel="shortcut icon" type="image/png" id="smio_favicon" href="/_/file/images/smoothio.png" />
		<style type="text/css"> span.smio-noscript { display: none; } canvas.smio-canvas3d { cursor: url('/_/file/images/crosshair.gif') !important; } </style>
	</head>
	<body id="smio_body" onload="onSmoothioPageLoad();" onblur="onSmoothioSleepy(true);" onfocus="onSmoothioSleepy(false);">
		<div id="smio_offline" class="smio-offline"><span id="smio_offline_msg"><%r:maintemplate_loading%></span>&nbsp;<span class="smio-blink">&#x273F;</span></div>
		<script type="text/javascript" language="JavaScript" id="smio_prescript">
			document.getElementById('smio_offline').style.display = 'block';
			var smioGlobalTest;
			try {
				smioGlobalTest = global;
			} catch(err) {
			}
			if (!smioGlobalTest)
				global = {};
			if (!global['smoothio'])
				global['smoothio'] = {}
			smio = global.smoothio;
			if (!smio['gfx'])
				smio.gfx = {};
			smio.pageLoadError = null;
			smio.iif = function(c, t, f) {
				if (arguments.length < 3) f = false;
				if (arguments.length < 2) t = true;
				return c ? t : f;
			};
		</script>
		<noscript id="smio_noscript">
			<style type="text/css"> span.smio-noscript { display: block !important; } </style>
		</noscript>
		<div id="smio_main" class="smio-main"><span class="smio-noscript" id="smio_noscript_content"><%arg:htmlContent%></span></div>
		<script type="text/javascript" language="JavaScript" src="/_/dynfile/?config=_res.js" onerror="onScriptError('_res.js');" defer="defer" async="async"></script>
		<script type="text/javascript" language="JavaScript" src="/_/file/_merged/_smoothio.js?r=<%= smio.Util.Number.randomInt(999999)%>" onerror="onScriptError('_smoothio.js');" defer="defer" async="async"></script>
		<!--xscript type="text/javascript" language="JavaScript" src="/_/file/coffee-script.js" onerror="onScriptError('coffee-script.js');" defer="defer" async="async"></xscript-->
	</body>
</html>
