#!/bin/bash
set -e
PROJECT="xanatha"
echo "$PROJECT: linting..."
yarn eslint $PROJECT --ext ts --fix