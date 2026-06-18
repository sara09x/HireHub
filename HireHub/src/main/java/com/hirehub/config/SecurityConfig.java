package com.hirehub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Main Spring Security configuration.
 */
@Configuration
public class SecurityConfig {

    /**
     * Password encoder bean used to hash passwords.
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    /**
     * Configure application security rules.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // Enable CORS
                .cors(cors -> {})

                // Disable CSRF for APIs
                .csrf(csrf -> csrf.disable())

                // Stateless JWT auth
                .sessionManagement(session ->

                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // Authorization rules
                .authorizeHttpRequests(auth -> auth

                        // Public endpoints
                        .requestMatchers(

                                "/users/login",
                                "/users/register"
                        ).permitAll()

                        // Allow preflight requests
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // All other endpoints require auth -- temporarily allow all for development
                        .anyRequest().permitAll()
                );

        return http.build();
        }
}