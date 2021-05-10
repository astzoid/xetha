#!/usr/bin/env bash
if [ "$1" == "clean" ]; then
    . "$(dirname "$0")/clean.sh"
fi

yarn lerna run build --scope "cathy"
