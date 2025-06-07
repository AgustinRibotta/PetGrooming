FROM openjdk:17

# Set the working directory
WORKDIR /hairdressin

# Copy the jar file into the container
COPY target/*.jar hairdressin.jar

# Run the application when the container starts
ENTRYPOINT [ "java", "-jar", "hairdressin.jar" ]

# Expose the port that the app will run on
EXPOSE 8080
