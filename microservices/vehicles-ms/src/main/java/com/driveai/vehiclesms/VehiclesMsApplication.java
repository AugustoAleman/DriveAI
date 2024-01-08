package com.driveai.vehiclesms;

import jakarta.annotation.PreDestroy;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;


/**
  * The VehiclesMsApplication class is responsible for starting the application.
  * It uses the @SpringBootApplication annotation to enable the Spring Boot auto-configuration and component scanning.
  * The @EnableDiscoveryClient annotation is used to enable service registration and discovery for clients.
  */
@SpringBootApplication
@EnableFeignClients
public class VehiclesMsApplication {
	@Autowired
	private EntityManagerFactory entityManagerFactory;

	public static void main(String[] args) {
		SpringApplication.run(VehiclesMsApplication.class, args);
	}
	@PreDestroy
	public void cleanup() {
		if (entityManagerFactory != null && entityManagerFactory.isOpen()) {
			entityManagerFactory.close();
		}
	}
}
