#!/bin/bash
PROJECT="xanatha"
echo "$PROJECT: linting..."
yarn eslint $PROJECT --ext ts --fix