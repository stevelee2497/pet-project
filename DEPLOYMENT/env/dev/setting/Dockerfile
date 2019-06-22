# this docker file will be built in "DEPLOYMENT/env/[env]/build_output/api"
FROM microsoft/dotnet:2.2-aspnetcore-runtime

COPY . /app

WORKDIR /app

EXPOSE 80

ENTRYPOINT [ "dotnet", "API.dll" ]
