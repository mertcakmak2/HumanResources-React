#!/bin/sh
docker rm -f react-app
docker image rm -f app-prod
docker-compose -f docker-compose.yml build
docker run -p 80:80 --name react-app -d app-prod