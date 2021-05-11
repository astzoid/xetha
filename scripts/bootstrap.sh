#!/usr/bin/env bash
echo "xetha: bootstrapping..."
yarn lerna bootstrap
. "$(dirname "$0")/shared/build.sh"
