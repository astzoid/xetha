#!/usr/bin/env bash
echo "shared: cleaning shared packages..."
yarn rimraf ./shared/**/dist ./shared/**/node_modules/.cache
