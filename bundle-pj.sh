#!/bin/sh

set -e
set -x

rm -rf build/*

yarn
yarn add babel-plugin-relay
yarn build

sh ./copy-bundle.sh
