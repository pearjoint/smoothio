#!/bin/bash
rm -f -r ../Dropbox/smoothio/*
cp -r -f * ../Dropbox/smoothio/
rm -f -r ../Dropbox/smoothio/_src/titanium/SmoothioMonitor/dist/linux/*
rm -f -r ../Dropbox/smoothio/_core/bin/linux/*
rm -f -r ../Dropbox/smoothio/_core/bin/osx/*
rm -f -r ../Dropbox/smoothio/_core/bin/osx/._*
rm -f -r ../Dropbox/smoothio/_core/bin/windows/*
rm -f -r ../Dropbox/smoothio/default/server/dbs/*
rm -f -r ../Dropbox/smoothio/_misc/nodesetup/tmp/*

cd ../gits/smoothio
git rm * -r -f
cd ../../smoothio/
rm -f -r ../gits/smoothio/*
cp -r -f * ../gits/smoothio/
rm -f -r ../gits/smoothio/_src/titanium/SmoothioMonitor/dist/linux/*
rm -f -r ../gits/smoothio/_core/bin/linux/*
rm -f -r ../gits/smoothio/_core/bin/osx/*
rm -f -r ../gits/smoothio/_core/bin/osx/._*
rm -f -r ../gits/smoothio/_core/bin/windows/*
rm -f -r ../gits/smoothio/default/server/dbs/*
rm -f -r ../gits/smoothio/_misc/nodesetup/tmp/*
cd ../gits/smoothio
git add .
git commit -m "$1"
git push -f -u origin master
cd ../../smoothio/

