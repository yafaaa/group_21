package com.insa_talent_student.management.auth.dtoLayer.dto;

import java.util.Set;

import com.insa_talent_student.management.auth.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtTokenResponse {
    private String token;
    private Set<Role> roles;
    private String tokenType;
    private String message;
}


