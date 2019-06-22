#!/usr/bin/env bash
DEPLOY_ENVIRONMENT=dev
CURRENT_PATH=$(pwd)
TARGET_PATH="../../../API/API"
OUTPUT_PATH="${CURRENT_PATH}/build_output/api"
REMOTE_PATH						=/home/ubuntu/services/projects/giveandtake/Trunk/deployment/deployment/env/${DEPLOY_ENVIRONMENT}/output/api
DEPLOYMENT_REMOTE_PATH=/home/ubuntu/services/projects/giveandtake/Trunk/deployment/deployment/env/${DEPLOY_ENVIRONMENT}
REMOTE_ID=ubuntu@103.101.76.127

echo "THIS WILL DEPLOY ON: ${DEPLOY_ENVIRONMENT}"
if [ -d "${TARGET_PATH}" ]; 
then
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

# docker build -t base-api .

# docker run --rm --name base-api -p 8000:80 base-api:latest

# read -r -p "Sending build to server and restart service now? [y/N] " response
# case "$response" in
#     [yY][eE][sS]|[yY])
#         echo "SENDING PACKAGE ..."
#         scp -C -i ./key/id_rsa -P 22 -r build_output/api/app ${REMOTE_ID}:${REMOTE_PATH}

# 		echo "RESTART DOCKER ..."
# 		export REMOTE_DOCKER_COMMAND="cd ${DEPLOYMENT_REMOTE_PATH};docker-compose up -d --force-recreate giveandtake-api-dev;"
# 		ssh -i ./key/id_rsa -p 22 ${REMOTE_ID} ${REMOTE_DOCKER_COMMAND}
#         ;;
#     *)
#         echo "not sending data, service not restarted. Exiting ..."
#         ;;
# esac
