#!/usr/bin/env bash
PROJECT="athena"
echo "$PROJECT: linting..."
yarn eslint $PROJECT --ext ts,tsx --fix