
var $j = jQuery.noConflict(),
	$t = Titanium,
	res = {
	"_"					:	""
,	"tabs_title1"		:	"'"
,	"tabs_title2"		:	"' Instance"
,	"tray_hint"			:	"smoothio Monitor"
,	"tray_menu_exit"	:	"Exit smoothio Monitor"
,	"tray_menu_show"	:	"Show smoothio Monitor"
,	"toolbar_refresh"	:	"Refresh All"
,	"toolbar_restart"	:	"Restart smoothio Daemon"
,	"toolbar_start"		:	"Start smoothio Daemon"
,	"toolbar_status"	:	"smoothio Daemon Status:"
,	"toolbar_stop"		:	"Stop smoothio Daemon"
, 	"toolbar_wait"		:	"(Wait...)"
	},
	smio = {
		exiting: false,
		lastWinPos : null,
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
		refreshView: function() {
			var dirName, subFile, lastID, subDirs, subTabPanel, tab= smio.win.tabPanel.getActiveTab();
			try {
				if (tab)
					lastID = tab.id;
				smio.win.viewPort.hide();
				smio.win.tabPanel.beginUpdate();
				smio.win.tabPanel.removeAll(true);
				if ((subDirs = smio.rootDir.getDirectoryListing()) && subDirs.length)
					for (var i = 0; i < subDirs.length; i++)
						if (subDirs[i].isDirectory() && subDirs[i]['name'] && (dirName = subDirs[i].name()) && dirName.length && (dirName.substr(0, 1) != '_') && (dirName != 'node_modules') && (subFile = $t.Filesystem.getFile(subDirs[i], 'instance.config')) && subFile.exists() && subFile.isFile()) {
							subTabPanel = new Ext.TabPanel({ tabPosition: 'bottom', border: false, plain: true, activeTab: 0, style: { backgroundColor: "buttonhighlight", padding: "0px 0px 32px 0px" } });
							subTabPanel.add({ title: "Configuration", items: new Ext.Panel({ layout: 'fit' }), id: "tab_" + dirName + "_config" });
							subTabPanel.add({ title: "'default_server' Server", html: "Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>Server Details<br/>", id: "tab_" + dirName + "_server" });
							subTabPanel.add({ title: "Logs", html: "Log Details", id: "tab_" + dirName + "_logs" });
							tab = smio.win.tabPanel.add({ title: (res.tabs_title1 + dirName + res.tabs_title2), items: subTabPanel, layout: 'fit', id: "tab_" + dirName });
							if (!lastID)
								lastID = tab.id;
						}
				if (lastID)
					smio.win.tabPanel.setActiveTab(lastID);
			} catch(err) {
				alert(err + "");
			} finally {
				smio.win.tabPanel.endUpdate();
				smio.win.tabPanel.doLayout();
				smio.win.viewPort.show();
			}
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
		}
	};

jQuery(document).ready(function() {
	smio.win = $t.UI.getCurrentWindow();
	smio.win.addEventListener($t.CLOSE, smio.onClose);
	smio.trayMenu = $t.UI.createMenu();
	smio.trayMenu.addItem(res.tray_menu_show, smio.show);
	smio.trayMenu.addItem(res.tray_menu_exit, smio.exit);
	smio.tray = $t.UI.addTray("app://smoothio.png", smio.show);
	smio.tray.setHint(res.tray_hint);
	smio.tray.setMenu(smio.trayMenu);
	smio.rootDir = smio.getRootPath($t.Filesystem.getApplicationDirectory());
});

Ext.BLANK_IMAGE_URL = '../../resources/images/default/s.gif';
Ext.onReady(function() {
	return;
	try {
		smio.win.toolBar = new Ext.Toolbar();
		smio.win.toolBar.add(new Ext.Toolbar.TextItem({ text: res.toolbar_status, style: { color: "GrayText", padding: "8px" } }));
		smio.win.toolBar.add({ text: res.toolbar_wait, disabled: true, menu: { xtype: "menu", plain: true, items: [ { text: res.toolbar_start, disabled: true }, { text: res.toolbar_stop, disabled: true }, { text: res.toolbar_restart, disabled: true }] } });
		smio.win.toolBar.addFill();
		smio.win.toolBar.add({ text: res.toolbar_refresh, handler: smio.refreshView });
		smio.win.toolBar.doLayout();
		smio.win.tabPanel = new Ext.TabPanel({ enableTabScroll: true, plain: true, activeTab: 0, border: false, style: { padding: "8px", backgroundColor: "buttonhighlight" } });
		smio.win.viewPort = new Ext.Viewport({ layout: 'border', defaults: { collapsible: false, split: false, border: false }, items: [{ items: smio.win.toolBar, region: 'north', autoHeight: true }, { items: smio.win.tabPanel, region: 'center', layout: 'fit' }] });
		setTimeout(smio.refreshView, 250);
	} catch(err) {
		alert(err + '');
	}
});

