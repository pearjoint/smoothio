var $j = jQuery.noConflict(),
	$t = Titanium,
	lang,
	res,
	resources = {},
	smio = {
		configDesc: {
			"smoothio": {
				
			},
			"mongodb": {
			},
			"cygwin": {
			}
		},
		curTabID: '_welcome',
		exiting: false,
		instances: {},
		lastWinPos : null,
		winActive: true,
		configUpdateDataMode: function() {
		},
		daemonGetStatus: function() {
			return 10;
		},
		daemonPrompt: function(temporary) {
			if (confirm(res.daemon_confirm1 + res['daemon_confirm' + (temporary ? 2 : 3)] + res.daemon_confirm4)) {
			}
		},		
		daemonRestart: function() {
		},
		daemonStart: function() {
		},
		daemonStop: function() {
		},
		exit: function() {
			smio.exiting = true;
			smio.tray.remove();
			$t.UI.clearTray();
			smio.win.hide();
			setTimeout(function() { $t.App.exit(); }, 125);
		},
		getRootPath: function (appDir) {
			var dir = appDir, dirName;
			while ((dir = dir.parent()) && (dirName = dir['name']()))
				if ((dirName == '_src') || (dirName == '_core'))
					return dir.parent();
			return null;
		},
		onClose: function(ev) {
			smio.lastWinPos = [smio.win.getX(), smio.win.getY()]
			if (smio.exiting)
				return true;
			if (ev && ev['preventDefault'])
				ev.preventDefault();
			setTimeout(smio.win.hide, 250);
			return false;
		},
		refreshUI: function(locs, status, instances) {
			var config, dirName, subFile, subFileStream, lastTab = smio.curTabID, lastTabFound = false, locChanged = false, subDirs, line;
			if (instances) {
				smio.selectTab('_welcome');
				$j('.smon-instnav-institem').remove();
				smio.instances = {};
				try {
					$j('#smon_main').css({ visibility: 'hidden' });
					if ((subDirs = smio.rootDir.getDirectoryListing()) && subDirs.length)
						for (var i = 0; i < subDirs.length; i++)
							if (subDirs[i].isDirectory() && subDirs[i]['name'] && (dirName = subDirs[i].name()) && dirName.length && (dirName.substr(0, 1) != '_') && (dirName != 'node_modules') && (subFile = $t.Filesystem.getFile(subDirs[i], 'instance.config')) && subFile.exists() && subFile.isFile())
								try {
									subFileStream = null;
									config = '';
									subFileStream = subFile.open($t.Filesystem.MODE_READ, false, false);
									while (line = subFileStream.readLine())
										config += (line + '');
									config = $t.JSON.parse(config);
									if (lastTab == dirName)
										lastTabFound = true;
									$j('.smon-instnav ul').append('<li class="smon-instnav-institem"><a href="#" onclick="smio.selectTab(\'' + dirName + '\');" id="smon_tab_' + dirName + '">' + res.tabs_title1 + dirName + res.tabs_title2 + '</a></li>');
								} catch(err) {
									alert(res.tabs_insterror1 + dirName + res.tabs_insterror2 + '\n\n' + err);
								} finally {
									if (subFileStream != null)
										subFileStream.close();
								}
				} catch(err2) {
					alert(err2 + "");
				} finally {
					if (lastTabFound)
						smio.selectTab(lastTab);
					$j('#smon_main').css({ visibility: 'visible' });
				}
			}
			if (status) {
				locChanged = true;
				$j('#smon_status').attr('smon-loc', 'toolbar_status_' + smio.daemonGetStatus());
			}
			if (locs || locChanged)
				$j('[smon-loc]').each(function(i, el) {
					var $el = $j(el), rk = $el.attr('smon-loc');
					$el.html(res[rk] + ((rk == 'tabs_welcome') ? (', <b>' + $t.Platform.getUsername() + '</b>') : ''));
				});
		},
		selectSubTab: function(tabID) {
			$j('.smon-subnav').removeClass('smon-subnav-active');
			$j("[smon-loc='subtab_" + tabID + "']").addClass('smon-subnav-active');
			$j('.smon-insttabs-tab').css({ 'display': 'none' });
			setTimeout(function() { $j('#subtab_' + tabID).css({ 'display': 'block' }); }, 10);
		},
		selectTab: function(tabID) {
			var otherID = ((tabID == '_welcome') ? '_inst' : '_welcome'), panelID = ((tabID == '_welcome') ? '_welcome' : '_inst');
			$j('.smon-instnav ul li a').removeClass('smon-instnav-active');
			$j('#smon_tab_' + tabID).addClass('smon-instnav-active');
			$j('#smon_box_' + otherID).slideUp();
			$j('#smon_box_' + panelID).slideDown();
			$j('#inst_headline').html($j('#smon_tab_' + tabID).html());
			smio.curTabID = tabID;
		},
		setLang: function(language) {
			res = resources[lang = language];
		},
		show: function() {
			var doShow = !smio.win.isVisible();
			if (doShow) {
				smio.win.show();
				if (smio.lastWinPos) {
					smio.win.setX(smio.lastWinPos[0]);
					smio.win.setY(smio.lastWinPos[1]);
				}
			}
			setTimeout(function() { smio.win.focus(); }, 250);
		},
		toggle: function() {
			if (smio.win.isVisible() && smio.winActive && !smio.win.isMinimized())
				smio.win.close();
			else
				smio.show();
		}
	};

jQuery(document).ready(function() {
	var l;
	smio.setLang('en');
	if (navigator.language && navigator.language.length && resources[l = navigator.language.substr(0, 2)])
		smio.setLang(l);
	smio.setLang('de');
	smio.win = $t.UI.getCurrentWindow();
	smio.win.addEventListener($t.CLOSE, smio.onClose);
	smio.trayMenu = $t.UI.createMenu();
	smio.trayMenu.addItem(res.tray_menu_show, smio.show);
	smio.trayMenu.addItem(res.tray_menu_exit, smio.exit);
	smio.tray = $t.UI.addTray("app://smoothio.png", smio.toggle);
	smio.tray.setHint(res.tray_hint);
	smio.tray.setMenu(smio.trayMenu);
	smio.rootDir = smio.getRootPath($t.Filesystem.getApplicationDirectory());
	$j('#smon_os').text($t.Platform.getName());
	$j('#smon_ov').text($t.Platform.getVersion());
	$j('#smon_tv').text($t.getVersion());
	$j('#smon_ar').text($t.Platform.getArchitecture());
	$j('#smon_pc').text($t.Platform.getProcessorCount());
	$j('#smon_pn').text(smio.platform = $t.getPlatform().toLowerCase());
	if (smio.platform.substr(0, 3) == 'win')
		smio.platform = 'windows';
	$j('fieldset div a').each(function(i, a) {
		var $a = $j(a);
		$a.click(function() {
			var att = $a.attr('smon-loc');
			alert(res[att] + '\n\n' + res['h_' + att], 'foo');
		});
	}).attr('href', '#');
});

jQuery(window).load(function() {
	smio.refreshUI(true, true, true);
	setInterval(function() { smio.refreshUI(false, true, false); }, 1000);
});

