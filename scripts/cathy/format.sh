#!/bin/bash
PROJECT="cathy"
echo "$PROJECT: formatting..."
yarn prettier --write "./$PROJECT/src/**/*.ts"