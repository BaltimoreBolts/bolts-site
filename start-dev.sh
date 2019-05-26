#!/bin/sh

if [ -d "node_modules" ]; then
    docker build -t bolts-site:local .
    docker run -e GTAG=UA-131204488-2 -p 8000:80 --name bolts-site --rm bolts-site:local
else
    echo "Error: Please run \"npm install\" before executing this script"
fi
