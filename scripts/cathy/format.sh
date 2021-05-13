#!/bin/bash
set -e
PROJECT="cathy"
echo "$PROJECT: formatting..."
yarn prettier --write "./$PROJECT/src/**/*.ts"