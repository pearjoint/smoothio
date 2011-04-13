var $j = jQuery.noConflict(),
	$t = Titanium,
	lang,
	res,
	resources = {},
	smio = {
		curTabID: '_welcome',
		exiting: false,
		lastWinPos : null,
		daemonGetStatus: function() {
			return 10;
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
			smio.win.minimize();
			setTimeout(smio.win.hide, 500);
			return false;
		},
		refreshUI: function(locs, status, instances) {
			var dirName, subFile, lastTab = smio.curTabID, lastTabFound = false, locChanged = false, subDirs;
			if (instances) {
				smio.selectTab('_welcome');
				$j('.smon-instnav-institem').remove();
				if ((subDirs = smio.rootDir.getDirectoryListing()) && subDirs.length)
					for (var i = 0; i < subDirs.length; i++)
						if (subDirs[i].isDirectory() && subDirs[i]['name'] && (dirName = subDirs[i].name()) && dirName.length && (dirName.substr(0, 1) != '_') && (dirName != 'node_modules') && (subFile = $t.Filesystem.getFile(subDirs[i], 'instance.config')) && subFile.exists() && subFile.isFile()) {
							if (lastTab == dirName)
								lastTabFound = true;
							$j('.smon-instnav ul').append('<li class="smon-instnav-institem"><a href="#" onclick="smio.selectTab(\'' + dirName + '\');" id="smon_tab_' + dirName + '">' + res.tabs_title1 + dirName + res.tabs_title2 + '</a></li>');
						}
				if (lastTabFound)
					smio.selectTab(lastTab);
			}
			if (status) {
				locChanged = true;
				$j('#smon_status').attr('smon-loc', 'toolbar_status_' + smio.daemonGetStatus());
			}
			if (locs || locChanged)
				$j('[smon-loc]').each(function(i, el) {
					var $el = $j(el);
					$el.html(res[$el.attr('smon-loc')]);
				});
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
			smio.win.focus();
		},
		toggle: function() {
			if (smio.win.isVisible())
				smio.win.close();
			else
				smio.show();
		}
	};

jQuery(document).ready(function() {
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
	smio.refreshUI(true, true, true);
	setInterval(function() { smio.refreshUI(false, true, false); }, 1000);
});

