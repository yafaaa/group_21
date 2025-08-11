package com.insa_talent_student.management.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.insa_talent_student.management.auth.jwtAuthanticationFilter;
import com.insa_talent_student.management.auth.entity.Role;

import java.util.List;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final jwtAuthanticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors // Enable CORS globally
                    .configurationSource(corsConfigurationSource())
                )
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity (enable in production)
                .authorizeHttpRequests(auth -> auth
                    // Public endpoints for authentication
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/public/**").permitAll()
                    .requestMatchers("/api/batch/**").permitAll()
                    .requestMatchers("/api/dorms/**").permitAll()
                     // Allow WebSocket connections
                    .requestMatchers("/ws/**").permitAll()
                    .requestMatchers("/app/**").permitAll()
                    .requestMatchers("/topic/**").permitAll()
                    // Customer-specific routes 
                    .requestMatchers("/api/customer/**").hasAnyRole(Role.MENTOR.name(), Role.ADMIN.name())
                    // Admin-specific routes
                    // .requestMatchers("/api/admin/**").hasRole(UserRole.ADMIN.name())
                    .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // Define a CORS configuration source to handle allowed origins, methods, and headers globally
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Sec-WebSocket-Key", "Sec-WebSocket-Version", "Accept", "X-Requested-With", "Origin"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); 
        return source;
    }
    
}




