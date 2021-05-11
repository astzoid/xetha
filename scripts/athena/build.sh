#!/usr/bin/env bash
PROJECT="athena"

echo "$PROJECT: compiling production build..."
yarn lerna run build --scope "$PROJECT"
echo "$PROJECT: production build done."
