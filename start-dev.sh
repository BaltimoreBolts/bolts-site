#!/bin/sh

docker build -t bolts-site:local .
docker run -e GTAG=UA-131204488-2 -p 8000:80 --name bolts-site --rm bolts-site:local