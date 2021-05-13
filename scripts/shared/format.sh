#!/bin/bash
echo "shared: formatting shared packages..."
yarn prettier --write "./shared/**/*.ts"