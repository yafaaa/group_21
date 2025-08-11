package com.insa_talent_student.management.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.insa_talent_student.management.auth.repository.UserCredentialRepo;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final UserCredentialRepo userCredentialRepo;
    @Bean
    UserDetailsService userDetailsService() {
    return username -> userCredentialRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

@Bean
public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService,
                                                      PasswordEncoder passwordEncoder) {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder);
    return authProvider;
}

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configration) throws Exception{
        return configration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
}

