#!/usr/bin/env bash
cd athena

if [ "$1" == "mock" ]; then
    yarn start &
    yarn mock
else
    yarn start
fi
