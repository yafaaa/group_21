package com.insa_talent_student.management.auth.dtoLayer.dtoMapper;

import org.springframework.stereotype.Component;

import com.insa_talent_student.management.auth.dtoLayer.dto.JwtTokenResponse;
import com.insa_talent_student.management.auth.dtoLayer.dto.LoginRequest;
import com.insa_talent_student.management.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthMapper {
    private final AuthService authService;

    public JwtTokenResponse login(LoginRequest request) {
        // Call the AuthService to handle the login logic
        return authService.login(request);
    }
}
