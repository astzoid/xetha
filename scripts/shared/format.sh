#!/usr/bin/env bash
echo "shared: formatting shared packages..."
yarn prettier --write "./shared/**/*.ts"
echo "shared: formatted."
