#!/bin/bash
set -e
PROJECT="athena"
echo "$PROJECT: compiling production build..."
yarn lerna run build --scope "$PROJECT"