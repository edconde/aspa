FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar

WORKDIR /

COPY ${JAR_FILE} app.jar

# Sin SSL y con base de datos in-memory:
# ENTRYPOINT ["java","-jar","/app.jar"]

# Con certificado SSL y base de datos MySQL (las variables de entorno se pueden establecer aqui o en docker-compose.yml):
# ENV SSL-CERT-PATH=/ssl/cert.pem
# ENV SSL-CERT-PRIVATE-KEY-PATH=/ssl/privkey.pem
# ENV SPRING_DATASOURCE_URL=jdbc:mysql://mysql-5.7-container:3306/database-name?serverTimezone=UTC&autoReconnect=true
# ENV SPRING_DATASOURCE_USERNAME=username
# ENV SPRING_DATASOURCE_PASSWORD=password
ENTRYPOINT ["java","-jar","/app.jar", "--spring.config.location=classpath:/production.application.properties"]