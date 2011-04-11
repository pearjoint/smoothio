#!/bin/bash
rm -f -r /opt/smoothio/*
cp -r -f * /opt/smoothio/
rm -f -r /opt/smoothio/_core/bin/osx/*
rm -f -r /opt/smoothio/_core/bin/osx/._*
rm -f -r /opt/smoothio/_core/bin/windows/*
rm -f -r /opt/smoothio/_misc/nodesetup/tmp/*
cp -f /opt/smoothio/_core/bin/linux/daemon/SmoothioDaemon.conf /etc/init/

