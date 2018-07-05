#!/bin/bash

docker build . -t jmf_prerender
docker tag jmf_prerender registry.cn-hangzhou.aliyuncs.com/jmf/jmf_prerender
docker push registry.cn-hangzhou.aliyuncs.com/jmf/jmf_prerender