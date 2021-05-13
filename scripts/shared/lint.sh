#!/bin/bash
set -e
echo "shared: linting shared packages"
yarn eslint shared --ext ts --fix