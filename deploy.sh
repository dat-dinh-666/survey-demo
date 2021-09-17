#!/bin/bash
USER="ubuntu"
HOST="ec2-52-215-28-114.eu-west-1.compute.amazonaws.com"
HOST_PATH="/var/www/survey/"

rsync -azL -e "ssh -i bringeast-survey.pem" --exclude-from=.rsyncignore  * ${USER}@${HOST}:${HOST_PATH}
