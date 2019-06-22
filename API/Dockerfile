FROM mcr.microsoft.com/dotnet/core/sdk:2.2 as build-env
WORKDIR /app

# Copy files to app folder in docker builder container and build
COPY . ./
RUN dotnet publish ./API/API.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /app
COPY --from=build-env /app/API/out ./
ENTRYPOINT ["dotnet", "API.dll"]