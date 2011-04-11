
Note: this ReadMe.txt does not apply to Windows, only to Linux and Mac OS X.

======================
 STEP 1: RUN SETUP.SH
======================

At a command prompt make setup.sh executable by typing:
	chmod +x ./setup.sh

Then run from the command prompt:
	./setup.sh


=========================
 STEP 2: INSTALL NODE.JS
=========================

Node.JS is not distributed with MetaLeap (just like other web-based software would not
redistribute Apache or IIS etc.) But Node.JS is easy enough to install on your server.

To test if Node.JS is installed BEFORE doing the below, type in your command prompt:
	node
(If it says "command not found", then Node.JS is not installed. If you get a new kind
of prompt such as [ > ], NodeJS is installed and you can return to your shell via ctrl+C.)

ONLY if Node.JS is not installed, run from a command prompt on...
...any Linux  with the apt-get command installed:
	cd node_modules/_setup
	sudo ./linux_getnode.sh
...on OSX with Apple's XCode already installed:
	cd node_modules/_setup
	sudo ./osx_getnode.sh

If node_modules/_setup/<your_os>_getnode.sh FAILS you, perform a manual install using one of the many
tutorials available online. Note that the shell script will attempt to download missing
packages that are required to build NodeJS, and will attempt to download and extract
the NodeJS package, so ensure the machine is connected to the Internet before running the
node_modules/_setup/<your_os>_getnode.sh shell script via sudo.

(node_modules/_setup/<your_os>_getnode.sh does not download or install the NodeJS "NPM" package manager,
since all node_modules MetaLeap depends on are packaged in the MetaLeap release.)


======================
 STEP 3: RUN METALEAP
======================

From the command prompt, run:
	./metaleap.sh

This should after a few seconds output something like:
	1 Apr 19:10:02 - SERVER 'metaleap' listening at localhost:8484


======================
 STEP 4: USE METALEAP
======================

Paste the above host:port info in your browser (may need to prefix http:// in some browsers).
MetaLeap will invite you to create an Administrator account, it will then provision the default
Site and display it, letting you further customize and configure your environment from there.

