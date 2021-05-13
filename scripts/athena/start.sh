#!/bin/bash
set -e
echo "Starting Athena Development Server..."
if [ "$1" == "mock" ]; then
    yarn workspace athena start &
    yarn workspace athena mock
else
    yarn workspace athena start
fi