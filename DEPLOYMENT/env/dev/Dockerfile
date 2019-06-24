# this docker file will be built in "DEPLOYMENT/env/[env]/build_output/api"
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2

COPY ~/volumes/dev/api /app

WORKDIR /app

EXPOSE 80

ENTRYPOINT [ "dotnet", "API.dll" ]
