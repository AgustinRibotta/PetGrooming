package com.api.hairdressin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class HairdressinApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load(); // Load .env file

        // Set environment variables
        System.setProperty("SPRING_PROFILES_ACTIVE", dotenv.get("SPRING_PROFILES_ACTIVE", "dev"));
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("SERVER_PORT", dotenv.get("SERVER_PORT"));
		
		SpringApplication.run(HairdressinApplication.class, args);
	}

}
