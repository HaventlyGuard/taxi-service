FROM public.ecr.aws/docker/library/gradle:8.14.4-jdk21-corretto AS build
WORKDIR /app

COPY . .

RUN gradle :trip-service:bootJar -x test

FROM public.ecr.aws/docker/library/amazoncorretto:21
WORKDIR /app

COPY --from=build /app/trip-service/build/libs/*.jar app.jar

EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/app/app.jar"]