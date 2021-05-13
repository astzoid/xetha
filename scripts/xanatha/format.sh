#!/bin/bash
PROJECT="xanatha"
echo "$PROJECT: formatting..."
yarn prettier --write "./$PROJECT/src/**/*.ts"