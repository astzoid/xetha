#!/bin/bash
set -e
echo "shared: formatting shared packages..."
yarn prettier --write "./shared/**/*.ts"