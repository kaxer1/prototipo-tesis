FROM openjdk:17-jdk-alpine as builder

WORKDIR /app/gateway

COPY ./pom.xml /app
COPY ./gateway/.mvn ./.mvn
COPY ./gateway/mvnw .
COPY ./gateway/pom.xml .

#RUN ./mvnw clean package -Dmaven.test.skip -Dmaven.main.skip -Dspring-boot.repackage.skip && rm -r ./target/
RUN ./mvnw dependency:go-offline
COPY ./gateway/src ./src

RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-alpine

WORKDIR /app
RUN mkdir ./logs
COPY --from=builder /app/gateway/target/gateway-0.0.1-SNAPSHOT.jar .
EXPOSE 8090
CMD ["java", "-jar", "gateway-0.0.1-SNAPSHOT.jar"]
