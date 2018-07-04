#!/bin/bash

docker rm jmf_prerender
docker build . -t jmf_prerender
docker run  -p 3000:3000 --name jmf_prerender  jmf_prerender
