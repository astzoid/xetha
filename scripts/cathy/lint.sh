#!/usr/bin/env bash
PROJECT="cathy"

echo "$PROJECT: linting..."
yarn eslint $PROJECT --ext ts --fix
echo "$PROJECT: linted."
