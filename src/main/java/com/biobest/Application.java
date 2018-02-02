package com.biobest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for Spring boot application
 */

@SpringBootApplication(scanBasePackages={"com.biobest", "com.biobest.entities"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}