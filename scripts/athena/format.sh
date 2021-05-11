#!/usr/bin/env bash
PROJECT="athena"

echo "$PROJECT: formatting..."
yarn prettier --write "./$PROJECT/src/**/*.{ts,tsx}"
echo "$PROJECT: formatted."
