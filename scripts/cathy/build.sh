#!/bin/bash
set -e
PROJECT="cathy"
if [ "$1" == "clean" ]; then
    . "$(dirname "$0")/clean.sh"
fi
echo "$PROJECT: compiling..."
yarn lerna run build --scope "$PROJECT"