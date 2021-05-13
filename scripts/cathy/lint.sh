#!/bin/bash
set -e
PROJECT="cathy"
echo "$PROJECT: linting..."
yarn eslint $PROJECT --ext ts --fix