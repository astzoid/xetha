#!/bin/bash
set -e
PROJECT="athena"
echo "$PROJECT: cleaning..."
yarn rimraf ./$PROJECT/dist ./$PROJECT/node_modules/.cache