package com.insa_talent_student.management.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insa_talent_student.management.auth.dtoLayer.dto.JwtTokenResponse;
import com.insa_talent_student.management.auth.dtoLayer.dto.LoginRequest;
import com.insa_talent_student.management.auth.dtoLayer.dtoMapper.AuthMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthCotroller {
    private final AuthMapper authMapper;
     @PostMapping("/login")
    public JwtTokenResponse login(@RequestBody LoginRequest request) {
        return authMapper.login(request);
    }
    
}
