#!/usr/bin/env bash
PROJECT="xanatha"
echo "$PROJECT: formatting..."
yarn prettier --write "./$PROJECT/src/**/*.ts"