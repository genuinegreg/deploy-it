#!/bin/bash

apt-get update -y

apt-get install -y software-properties-common

apt-add-repository -y ppa:chris-lea/node.js
apt-get update -y

apt-get install -y nodejs npm phantomjs build-essential git unzip libplist-utils


npm install -g yo grunt-cli bower
