#!/bin/bash

rsync -azvR --delete-after \
	dist/ico \
	dist/img \
	dist/scripts/*.scripts.js \
	dist/scripts/directives/*.html \
	dist/styles/*.styles.css \
	dist/styles/img \
	dist/vendor \
	dist/views \
	dist/*.html \
	dist/robots.txt \
	dist/manifest.appcache \
	srv \
	locales \
	package.json \
	\
	plop.io:/root/dploy/
