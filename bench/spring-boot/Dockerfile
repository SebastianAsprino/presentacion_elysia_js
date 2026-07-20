FROM maven:3.9-eclipse-temurin-8 AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn -B dependency:go-offline
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:8-jre-alpine
WORKDIR /app
COPY --from=build /app/target/bench-spring-boot.jar ./app.jar
EXPOSE 3000
CMD ["java", "-jar", "app.jar"]
