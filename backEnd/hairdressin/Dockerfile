FROM openjdk:17

WORKDIR /haurdressin

COPY target/*.jar haurdressin.jar

ENTRYPOINT [ "java", "-jar", "haurdressin.jar" ]

EXPOSE 8080