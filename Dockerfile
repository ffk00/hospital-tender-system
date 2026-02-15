# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY ui/hospital-system-ui/package.json ui/hospital-system-ui/package-lock.json ./
RUN npm ci
COPY ui/hospital-system-ui/ .
RUN npm run build

# Stage 2: Build Spring Boot backend (with frontend bundled)
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY server/pom.xml .
RUN mvn dependency:go-offline -B
COPY server/src ./src
# Copy React build output into Spring Boot static resources
COPY --from=frontend-build /app/dist ./src/main/resources/static
RUN mvn package -DskipTests -B

# Stage 3: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
