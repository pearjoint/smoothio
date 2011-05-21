#!/bin/bash

node_version="node-v0.4.7"
apt-get install build-essential g++ curl libssl-dev apache2-utils pkg-config
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

