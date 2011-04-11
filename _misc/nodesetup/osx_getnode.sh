#!/bin/bash

echo "IF you get gcc, cxx, make or ./configure error messages below, install XCode first; this is a required pre-requisite and available both on your Mac OS X installation DVD and also for download at apple.com."
node_version="node-v0.4.5"
mkdir -p tmp
rm -f -r tmp/*
cd tmp
curl http://nodejs.org/dist/$node_version.tar.gz --output $node_version.tar.gz
gunzip $node_version.tar.gz
tar -xf $node_version.tar
cd $node_version
./configure
make
make install
cd ../..
echo "IF you got gcc, cxx, make or ./configure error messages above, install XCode first; this is a required pre-requisite and available both on your Mac OS X installation DVD and also for download at apple.com."

