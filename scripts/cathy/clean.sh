#!/usr/bin/env bash
PROJECT="cathy"

echo "$PROJECT: cleaning..."
yarn rimraf ./$PROJECT/dist ./$PROJECT/node_modules/.cache
