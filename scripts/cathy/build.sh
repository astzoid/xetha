#!/usr/bin/env bash
PROJECT="cathy"
if [ "$1" == "clean" ]; then
    . "$(dirname "$0")/clean.sh"
fi
echo "$PROJECT: compiling production build..."
yarn lerna run build --scope "$PROJECT"