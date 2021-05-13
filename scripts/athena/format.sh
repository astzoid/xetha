#!/bin/bash
set -e
PROJECT="athena"
echo "$PROJECT: formatting..."
yarn prettier --write "./$PROJECT/src/**/*.{ts,tsx}"