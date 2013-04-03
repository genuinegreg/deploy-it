#!/bin/bash

apt-get update -y

# apt-get install


apt-add-repository -y ppa:chris-lea/node.js

apt-get update -y

apt-get install -y monit nodejs


# install scripts...

ln -fs /home/dploy/dploy/upstart.conf /etc/init/dploy.conf

