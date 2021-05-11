#!/usr/bin/env bash
PROJECT="xanatha"

echo "$PROJECT: linting..."
yarn eslint $PROJECT --ext ts --fix
echo "$PROJECT: lint completed."