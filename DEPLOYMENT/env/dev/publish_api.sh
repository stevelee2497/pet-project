#!/usr/bin/env bash
DEPLOY_ENVIRONMENT=dev
CURRENT_PATH=$(pwd)
TARGET_PATH="../../../API/API"
OUTPUT_PATH="${CURRENT_PATH}/build_output/api"
DEPLOYMENT_REMOTE_PATH=~/project-skeleton/DEPLOYMENT/env/dev
REMOTE_ID=quoctran@192.168.164.134

echo "THIS WILL DEPLOY ON: ${DEPLOY_ENVIRONMENT}"
if [ -d "${TARGET_PATH}" ]; then
	cd "${TARGET_PATH}"
else
	echo "target path not found"
	exit -1
fi

echo "CLEANING BUILD FOLDER ..."
rm -rf "${OUTPUT_PATH}"
mkdir -p "${OUTPUT_PATH}"

echo "BUILDING API PACKAGE ..."
dotnet publish API.csproj -o "${OUTPUT_PATH}"

echo "REPLACING CONFIG FOR: ${DEPLOY_ENVIRONMENT}"
cd "${CURRENT_PATH}/setting"
cp -f * "${OUTPUT_PATH}"

cd "${CURRENT_PATH}"

# docker-compose up -d --build --force-recreate

# docker build -t base-api .

# docker run --rm --name base-api -p 8000:80 base-api:latest

read -r -p "Sending build to server and restart service now? [y/N] " response
case "$response" in
[yY][eE][sS] | [yY])
	echo "SENDING PACKAGE ..."
	scp -C -i ./key/mykey -P 22 -r build_output/api ${REMOTE_ID}:~/volumes/${DEPLOY_ENVIRONMENT}
	echo "RESTART DOCKER ..."
	export REMOTE_DOCKER_COMMAND="cd ${DEPLOYMENT_REMOTE_PATH};docker-compose up -d --force-recreate base-api"
	ssh -i ./key/mykey -p 22 ${REMOTE_ID} ${REMOTE_DOCKER_COMMAND}
	;;
*)
	echo "not sending data, service not restarted. Exiting ..."
	;;
esac
