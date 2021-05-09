#!/bin/sh
yarn lerna bootstrap
. "$(dirname "$0")/shared/build.sh"
