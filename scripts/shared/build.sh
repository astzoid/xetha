#!/usr/bin/env bash
if [ "$1" == "clean" ]; then
    . "$(dirname "$0")/clean.sh"
fi

echo "shared: compiling packages..."
yarn lerna run build --scope "@shared/+(**)"
