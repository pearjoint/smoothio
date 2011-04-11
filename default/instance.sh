#!/bin/bash

# keeps smoothio running
# for terminal-based development only, in production deployments _core/daemon/SmoothioDaemon[.py] does this stuff

osname=$(uname)
if [ $osname = "Darwin" ]; then
	osname="osx"; # dont put spaces here, it somehow breaks the logic, this way works.
elif [ $osname = "Linux" ]; then
	osname="linux"; # dont put spaces here, it somehow breaks the logic, this way works.
fi;
while true;
	do
		../_core/bin/$osname/node ./instance.js # launch smoothio
		exit_value="$?"; # dont put spaces here, it somehow breaks the logic, this way works.
		if [ "$exit_value" = "1" ]; then # smoothio ended with error, don't restart
			exit 1;
		elif [ "$exit_value" != "0" ]; then # smoothio wants to restart
			sleep 0.1;
		else # smoothio shut down cleanly, no restart
			exit 0;
		fi ;
done;

