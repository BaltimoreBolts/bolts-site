#!/bin/sh

VERSION=$(cat package.json | jq .version | tr -d '"')

docker build -t baltimorebolts/bolts-site:$VERSION . && docker push baltimorebolts/bolts-site:$VERSION