// com.insa_talent_student.management.auth.entity.Role
package com.insa_talent_student.management.auth.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
public enum Role {
    STUDENT,
    MENTOR,
    ADMIN;
    
    @Getter
    private final List<SimpleGrantedAuthority> authorities = 
        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.name()));
}