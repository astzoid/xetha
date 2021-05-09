#!/bin/sh
yarn lerna bootstrap
yarn lerna run build --scope "shared/+(*)"