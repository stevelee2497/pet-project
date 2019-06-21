FROM microsoft/dotnet:2.2-aspnetcore-runtime

COPY ./build_output/api /app

WORKDIR /app

EXPOSE 80

ENTRYPOINT [ "dotnet", "API.dll" ]
