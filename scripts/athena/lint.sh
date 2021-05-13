#!/bin/bash
set -e
PROJECT="athena"
echo "$PROJECT: linting..."
yarn eslint $PROJECT --ext ts,tsx --fix