#!/bin/bash
set -e
PROJECT="xanatha"
echo "$PROJECT: cleaning..."
yarn rimraf ./$PROJECT/dist ./$PROJECT/node_modules/.cache