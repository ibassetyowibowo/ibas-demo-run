# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
COPY ./src /app


# Copy the published application files from the local machine into the container
WORKDIR /app
EXPOSE 8080

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "E-Ticketing.dll"]

