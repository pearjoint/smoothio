resources['de'] = {
	"_"					:	""
,	"config_db"			:	"Datenbankzugriff"
,	"config_db_am"		:	"Zugriffsmodus:"
,	"h_config_db_am"	:	"Eingebettet: smoothio runs its own local MongoDB instance; database files reside in a smoothio instance sub-folders.\n\nExternal: connect to a local or remote MongoDB database server managed and run outside of smoothio."
,	"config_db_am_em"	:	"eingebettet"
,	"config_db_am_ex"	:	"extern"
,	"config_db_host"	:	"DB-Server:"
,	"h_config_db_host"	:	"In embedded mode, this is always 127.0.0.1.\n\nIn external mode, specify the IP address or host name of the MongoDB database server."
,	"config_db_port"	:	"Port:"
,	"h_config_db_port"	:	"In embedded mode, specify the port the local MongoDB instance should accept connections at.\n\nIn external mode, specify the port the local or remote MongoDB database server specified above is accepting connections at."
,	"config_db_path"	:	"Datenpfad:"
,	"h_config_db_path"	:	"Embedded mode only. Specify the directory path (always relative to the instance directory) to store the smoothio administrative and content databases."
,	"config_db_log"		:	"Logdateipfad:"
,	"h_config_db_log"	:	"Embedded mode only. Specify the file path (always relative to the instance directory) to store the smoothio MongoDB database logs.\n\nTo avoid overwriting of old log files, you can include one asterisk [*] in the file path (to be expanded into date and time in the file name when the log file is created)."
,	"config_db_au"		:	"Benutzername:"
,	"h_config_db_au"	:	"External mode only. If the local or remote MongoDB database server requires authentication, specify the user name."
,	"config_db_ap"		:	"Kennwort:"
,	"h_config_db_ap"	:	"External mode only. If the local or remote MongoDB database server requires authentication, specify the password.\n\nCAUTION: this will be stored unencrypted in the plain-text instance.config file. Secure that file accordingly so that only you and the smoothio user group can access it."
,	"config_db_ar"		:	"DB-Server erfordert Authentifizierung"
,	"config_unsaved"	:	"Configuration modifications not yet saved. <a href=\"#\" onclick=\"smio.daemonPrompt(true);\">Save now</a> (or <a href=\"#\">Reload</a> the present configuration)."
,	"config_info"		:	"To show a brief info tip about a setting, click its name. For more in-depth help, consult the smoothio product documentation."
,	"config_general"	:	"Allgemein"

,	"daemon_confirm1"	:	"If you proceed now, the smoothio Daemon will be shut down"
,	"daemon_confirm2"	:	" for approximately 2-6 seconds. This should not disrupt most current users too much, but will abort all in-progress client operations such as file uploads or downloads."
,	"daemon_confirm3"	:	". This will disconnect all current users and abort all in-progress client operations such as file uploads or downloads."
,	"daemon_confirm4"	:	"\n\nContinue anyway?"
,	"daemon_warnreset"	:	"Confirm server resets"

,	"info_for"			:	"f&uuml;r"
,	"info_arch"			:	"Architektur:"
,	"info_procs"		:	"Prozessoren / Kerne:"

,	"subtab_config"		:	"Konfiguration"
,	"subtab_logs"		:	"Logs"
,	"subtab_overview"	:	"&Uuml;berblick"
,	"subtab_servers"	:	"Server"

,	"tabs_insterror1"	:	"Die Instanz '"
,	"tabs_insterror2"	:	"' konnte nicht geladen werden:"
,	"tabs_title1"		:	"<b>"
,	"tabs_title2"		:	"</b>-Instanz"
,	"tabs_welcome"		:	"Willkommen"

,	"tray_hint"			:	"smoothio Monitor"
,	"tray_menu_exit"	:	"smoothio Monitor beenden"
,	"tray_menu_show"	:	"smoothio Monitor öffnen"

,	"toolbar_refresh"	:	"Aktualisieren"
,	"toolbar_restart"	:	"Neu starten"
,	"toolbar_start"		:	"Starten"
,	"toolbar_status"	:	"smoothio Daemon-Status:"
,	"toolbar_status_0"	:	"Angehalten"
,	"toolbar_status_1"	:	"Gestartet"
,	"toolbar_status_2"	:	"Wird gestartet"
,	"toolbar_status_3"	:	"Wird beendet"
,	"toolbar_status_10"	:	"Unbekannt"
,	"toolbar_stop"		:	"Beenden"
, 	"toolbar_wait"		:	"(wird ermittelt...)"

, 	"welcome_headline"	:	"So verwenden Sie smoothio Monitor:"
, 	"welcome_para1"		:	"Die linke Navigation listet Ihre <b>smoothio-Instanzen</b> auf. Sobald und solange der <b>smoothio Daemon</b> l&auml;uft, stellt dieser die Ausf&uuml;hrung und Verf&uuml;gbarkeit dieser Instanzen sicher."
, 	"welcome_para2"		:	"Jede <b>smoothio-Instanz</b> wird als eigener Prozess ausgef&uuml;hrt und kann mehrere <b>smoothio-Server</b> enthalten (jene Sites, welche Ihre Anwender besuchen). Anfangs bzw. meistens gen&uuml;gt eine einzige Instanz."
, 	"welcome_para3"		:	"Zur Überwachung oder Konfiguration einer <b>smoothio-Instanz</b> w&auml;hlen Sie diese links aus. Sie k&ouml;nnen dann Logdateien sowie die grundlegende Instanzkonfiguration, als auch ihre <b>smoothio-Server</b> und deren Datenbankzugriff einsehen bzw. anpassen."
, 	"welcome_para4"		:	"<em>Hinweis:</em> dies ist ein Werkzeug zur &quot;niederen&quot; Daemon/Server-Verwaltung und &Uuml;berwachung. Weiterf&uuml;hrende &uuml;bergeordnete administrative Werkzeuge sowie detailliertere Dokumentation finden Sie in Ihren smoothio-Sites, sobald und solange Ihre Instanzen und deren Server &uuml;ber Ihren Webbrowser erreichbar sind."
,	"welcome_summary"	:	"Aktuell laufende smoothio-Server:"
};
