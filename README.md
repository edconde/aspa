# aspa - Aplicación para el Seguimiento de Pruebas de Atletismo

## Proyectos:
- Base de datos: BD MySQL 5.7
- Back end: Spring Boot
- Front end: App web Angular

### Pasos para arrancar el proyecto en local:

- Back end:
    -   Requisitos: Maven y Java 8
    -   Ejecutar los siguientes comandos para levantar la aplicación en localhost:8080 con una base de datos en memoria (H2).
        -   mvn install
        -   mvn package
        -   java --jar target/aspa-0.0.1-SNAPSHOT.jar
- Front end:
    -   Requisitos: NodeJs y npm
    -   Ejecutar los siguientes comandos para levantar la aplicación en localhost:4200.
        -   npm install
        -   ng serve --o
        
### Pasos para desplegar el proyecto:
- Back end:
    -   Requisitos: Maven, Java 8 y Docker
    -   Desde la ruta /aspa-backend, compilar el proyecto Spring Boot pasando el siguiente argumento:
        -   --spring.config.location=classpath:production.application.properties
    -   Generar imagen de Docker:
        -   docker build -t aspa-api-image .
    -   Modificar el fichero aspa-backend/docker-compose-yml asignando los valores deseados a las siguientes variables de entorno
        -   MYSQL_ROOT_PASSWORD
        -   SPRING_DATASOURCE_URL
        -   SPRING_DATASOURCE_USERNAME
        -   SPRING_DATASOURCE_PASSWORD
        -   SSL-CERT-PATH
        -   SSL-CERT-PRIVATE-KEY-PATH
    -   Si no se usa SSL, deshabilitarlo en el fichero /src/main/resources/application.properties.
    -   Crear y ejecutar los contenedores con la aplicación Spring Boot y la base de datos MySQL mediante el comando:
        -   docker-compose up -d --no-build
    -   EJecutar los siguientes scripts para crear y poblar la base de datos:
        -   aspa-db/aspa_crear_usuario_db.sql (modificar introduciendo usuario y contraseña establecidos anteriormente en SPRING_DATASOURCE_USERNAME y SPRING_DATASOURCE_PASSWORD)
        -   aspa-db/aspa_crear_entidades.sql.sql
        -   aspa-db/aspa_datos.sql

- Front end:
    -   Requisitos: NodeJs y npm    
    -   Despliegue en GitHub Pages (https://edconde.github.io/aspa):
        -   Desde la ruta /aspa-app, Ejecutar los comandos 'npm install' y 'npm run deploy-github-pages'.
        -   Habilitar GitHub Pages para el repositorio en GitHub, configurando el despliegue desde la carpeta '/docs' de la rama 'main':
        ![image](https://user-images.githubusercontent.com/15130843/192157557-1882fde0-79dc-45af-83e1-a6ba57c3f059.png)

    -   Despliegue en un servidor:
        -   Desde la ruta /aspa-frontend, Ejecutar los comandos 'npm install' y 'npm run production'.
        -   Subir los ficheros que se han generado en el directorio /dist/aspa al servidor web de turno (por ejemplo, Apache).

#### Otros comandos útiles:
-   Copiar una imagen docker local a un servidor:
    -   'docker save aspa-api-image | ssh -C username@host docker load'
-   Crear un contenedor a partir de la imagen sin usar docker-compose:
    -   'docker container create --name aspa-api-container -p 8443:8443 aspa-api-image'
