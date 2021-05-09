#!/bin/sh
yarn rimraf athena/dist
yarn rimraf cathy/dist cathy/node_modules/.cache
yarn rimraf xanatha/dist xanatha/node_modules/.cache
yarn rimraf shared/**/dist shared/**/node_modules/.cache