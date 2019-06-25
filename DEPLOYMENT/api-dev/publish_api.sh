#!/usr/bin/env bash
DEPLOY_ENVIRONMENT=api-dev
CURRENT_PATH=$(pwd)
BUILD_PATH="../../API/API"
BUILD_OUTPUT_PATH="${CURRENT_PATH}/volume"
REMOTE_ID=quoctran@192.168.164.134
REMOTE_DEPLOY_PATH=/home/quoctran/project-skeleton/DEPLOYMENT/${DEPLOY_ENVIRONMENT}

echo "THIS WILL DEPLOY ON: ${DEPLOY_ENVIRONMENT}"
if [ -d "${BUILD_PATH}" ]; then
	cd "${BUILD_PATH}"
else
	echo "target path not found"
	exit -1
fi

echo "CLEANING BUILD FOLDER ..."
rm -rf "${BUILD_OUTPUT_PATH}"
mkdir -p "${BUILD_OUTPUT_PATH}"

echo "BUILDING API PACKAGE ..."
dotnet publish API.csproj -o "${BUILD_OUTPUT_PATH}"

echo "REPLACING CONFIG FOR: ${DEPLOY_ENVIRONMENT}"
cd "${CURRENT_PATH}/setting"
cp -f * "${BUILD_OUTPUT_PATH}"

read -r -p "Sending build to server and restart service now? [y/N] " response
case "$response" in
[yY][eE][sS] | [yY])
	echo "SENDING PACKAGE ..."
	cd "${CURRENT_PATH}"
	scp -C -i ./key/mykey -P 22 -r volume ${REMOTE_ID}:${REMOTE_DEPLOY_PATH}
	echo "RESTART DOCKER ..."
	export REMOTE_DOCKER_COMMAND="cd ${REMOTE_DEPLOY_PATH};sudo docker-compose up -d --force-recreate ${DEPLOY_ENVIRONMENT}"
	ssh -i ./key/mykey -p 22 ${REMOTE_ID} ${REMOTE_DOCKER_COMMAND}
	;;
*)
	echo "not sending data, service not restarted. Exiting ..."
	;;
esac
