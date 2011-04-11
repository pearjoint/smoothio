#!/bin/bash
echo "Setting file Executable attributes..."
chmod -f +x ../_core/bin/linux/node
chmod -f +x ../_core/bin/osx/node
chmod -f +x ../_core/bin/linux/mongod
chmod -f +x ../_core/bin/osx/mongod
chmod -f +x nodesetup/linux_getnode.sh
chmod -f +x nodesetup/osx_getnode.sh
chmod -f +x default/instance.sh
echo "Done. To start smoothio now, cd to ./default and run:"
echo "./instance.sh"

