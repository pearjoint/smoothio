smooth.io -- pre-alpha, unstable, just beginning.
===

Right now just a NodeJS HTTP server that shows not even Hello World.

So no point in running it yet, it doesn't do much at present.

No ready-to-run packages for Linux/OSX/Windows yet but these are forthcoming.

If you must, you can run under Linux:

Download MongoDB 64 bit for Linux and copy its bin binaries to _core/bin/linux so that _core/bin/linux/mongod exists.
Grab NodeJS and copy the node binary to _core/bin/linux so that _core/bin/linux/node exists.
Then...

	chmod -f +x _misc/setup.sh
	cd _misc
	./setup.sh
	cd ../default
	./instance.sh


Directory Structure
---

- **_cscript** -- the entire application server code in CoffeeScripts. Dir tree is compiled (at startup by default/instance.js) to JavaScripts stored at default/server/_jscript
- **node_modules** -- global NodeJS modules
- **_core** -- code, binaries, dependencies, libraries and artifacts loaded by smoothio
	- **bin** -- programs that smoothio depends on
		- **osx** -- OSX-specific binaries. In the end user-deployable distribution contains Mac OSX builds for NodeJS and MongoDB
		- **windows** -- Windows-specific binaries. In the end user-deployable distribution contains Windows builds for NodeJS and MongoDB
		- **linux** -- binaries for "all" (as broadly as possible) non-Windows / non-OSX systems. Contains Linux builds for NodeJS and MongoDB.
			- **daemon** -- contains scripts for the SmoothioDaemon background service under Linux
			- **monitor** -- will contain the Linux build of the SmoothioMonitor GUI utility
	- **packs** -- global smoothio packages shared by all smoothio instances
	- **res** -- global (not package-specific) localized resource files
	- **stylus** -- global (not package-specific) Stylus sheets. Dir tree is compiled (at startup by default/instance.js) to CSS files stored at default/server/pub/_styles
- **default** -- the default smoothio instance. Multiple instances can be managed and run by a single SmoothioDaemon by cloning this folder. Folder name = instance name.
	- **node_modules** -- instance-specific NodeJS modules
	- **packs** -- instance-specific smoothio packages
	- **server** -- all the REAL instance stuff that's neither modules nor packages...
		- **dbs** -- MongoDB administration and content databases for smoothio servers in Embedded database mode
		- **_jscript** -- JavaScripts compiled from the CoffeeScripts in .../_cscript
		- **log** -- log files for MongoDB and this smoothio instance
		- **_packs** -- dynamically compiled modules for the .ctl controls contained in smoothio packages
		- **pub** -- the root folder for files directly accessible via the _/file URL handler (ie server/_/file/x/y.txt maps to pub/x/y.txt)
			- **images** -- core smoothio imagery
			- **_packs** -- symlinks or outputs from the installed smoothio packages (ie. raw artifacts such as images, css etc. are symlinked, others [.cs .styl .ctl] processed and their outputs placed here)
			- **scripts** -- global client-side JavaScript libraries (json, jquery etc.)
			- **_scripts** -- global client-side JavaScripts compiled from .../_cscript/client/*.cs
			- **styles** -- global cascading style sheets
			- **_styles** -- global cascading style sheets compiled from .../_core/stylus/*.styl
	- *instance.config* -- instance configuration file
	- *instance.js* -- NodeJS entry point / bootstrap script. Performs compiles, sets up file watching, starts the ../_cscript/Instance.cs
	- *instance.sh* -- respawning daemon-like terminal-based runner for instance.js (for development; in the end user-deployable distribution SmoothioDaemon will be used instead)
- **_misc** -- random development helpers that will not be included in the end user-deployable distribution
- **_src** -- OS-specific source code that is not compiled at runtime (like the _cscript CoffeeScripts etc.) but at buid time and will not be included in the end user-deployable distribution

