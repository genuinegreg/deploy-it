#!/bin/bash

rsync -azv --delete-after dist app srv locales package.json plop.io:/root/dploy/
