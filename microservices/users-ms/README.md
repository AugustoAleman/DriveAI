## Configuración de `application.properties`
```agsl
server.port=8080
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/todo
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#spring.jpa.show-sql: true
#swagger-ui custom path
springdoc.api-docs.enables = true
springdoc.swagger-ui.enabled = true
springdoc.swagger-ui.path=/doc/swagger-ui.html
springdoc.pathToMathc=/v1/users/**, /xyz/**
```

URL =  http://localhost:8080/doc/swagger-ui/index.html#/