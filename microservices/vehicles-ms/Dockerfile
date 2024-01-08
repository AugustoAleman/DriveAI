# Use a base image with JDK 17 and Maven pre-installed
FROM maven:3.8.3-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml file to the container
COPY pom.xml .

# Download the dependencies specified in the pom.xml
RUN mvn dependency:go-offline

# Copy the source code to the container
COPY src ./src

# Build the application using Maven
RUN mvn package -DskipTests

# Create a new image using a lighter base image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build stage to the container
COPY --from=build /app/target/vehicles-ms-0.0.1-SNAPSHOT.jar .

# Expose the port that the Spring Boot application listens on
EXPOSE 8081

# Run the Spring Boot application when the container starts
CMD ["java", "-jar", "vehicles-ms-0.0.1-SNAPSHOT.jar"]