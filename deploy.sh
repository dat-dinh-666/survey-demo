#!/bin/bash
USER="ubuntu"
HOST="34.246.29.190"
HOST_PATH="/var/www/survey/"

npm run prod
rsync -azL -e "ssh -i bringeast-survey.pem" --exclude-from=.rsyncignore  * ${USER}@${HOST}:${HOST_PATH}
ansible-playbook deploy.yaml -f 10
