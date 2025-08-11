#!/bin/bash
# This script starts the Jenkins container with the correct permissions.

docker run -d -p 8080:8080 -p 50000:50000 \
  -u root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v jenkins_home:/var/jenkins_home \
  --name my-jenkins \
  jenkins/jenkins:lts
