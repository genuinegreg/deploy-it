#!/bin/bash

rsync -azv --delete-after dist srv locales package.json plop.io:/root/dploy/
