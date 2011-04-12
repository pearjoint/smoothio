
var $j = jQuery.noConflict(),
	$t = Titanium,
	res = {
	"_"					:	""
,	"tray_hint"			:	"smoothio Monitor"
,	"tray_menu_exit"	:	"Exit smoothio Monitor"
,	"tray_menu_show"	:	"Show smoothio Monitor"
,	"toolbar_restart"	:	"Restart smoothio Daemon:"
,	"toolbar_start"		:	"Start smoothio Daemon:"
,	"toolbar_status"	:	"smoothio Daemon Status:"
,	"toolbar_stop"		:	"Stop smoothio Daemon:"
, 	"toolbar_wait"		:	"(Wait...)"
	},
	smio = {
		exiting: false,
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
			if (smio.exiting)
				return true;
			if (ev && ev['preventDefault'])
				ev.preventDefault();
			smio.win.hide();
			return false;
		},
		show: function() {
			if (!smio.win.isVisible())
						smio.win.show();
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
	smio.rootPath = smio.getRootPath($t.Filesystem.getApplicationDirectory());
});

Ext.BLANK_IMAGE_URL = '../../resources/images/default/s.gif';
Ext.onReady(function() {
	Ext.QuickTips.init();
	smio.win.toolBar = new Ext.Toolbar({ renderTo: 'toolbar' });
	smio.win.toolBar.add(new Ext.Toolbar.TextItem({ text: res.toolbar_status, style: { color: "GrayText", padding: "8px" } }));
	smio.win.toolBar.add({ text: res.toolbar_wait, menu: { xtype: "menu", plain: true, items: [ { text: res.toolbar_start, disabled: true }, { text: res.toolbar_stop, disabled: true }, { text: res.toolbar_restart, disabled: true }] } });
	smio.win.toolBar.addFill();
	smio.win.toolBar.doLayout();
	smio.win.tabMain = { title: 'Instances & Servers', html: "My content was added during construction.<br/>" },
	smio.win.tabInst = { title: '"default" Instance', html: "Yet another test... My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>" },
	smio.win.tabInst2 = { title: '"default2" Instance', html: "Yet another test... My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>" },
	smio.win.tabInst1 = { title: '"default1" Instance', html: "Yet another test... My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>My content was added during construction.<br/>" },
	smio.win.tabPanel = new Ext.TabPanel({ renderTo: document.body, enableTabScroll: true, plain: true, activeTab: 0, style: { padding: "8px" }, items: [smio.win.tabMain, smio.win.tabInst, smio.win.tabInst1, smio.win.tabInst2] });
});

