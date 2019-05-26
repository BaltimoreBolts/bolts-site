#!/bin/sh

if [ -d "node_modules" ]; then
    VERSION=$(cat package.json | jq .version | tr -d '"')
    docker build -t baltimorebolts/bolts-site:$VERSION . && docker push baltimorebolts/bolts-site:$VERSION
else
    echo "Error: Please run \"npm install\" before executing this script"
fi
