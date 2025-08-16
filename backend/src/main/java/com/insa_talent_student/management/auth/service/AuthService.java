package com.insa_talent_student.management.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.insa_talent_student.management.auth.AuthAPI;
import com.insa_talent_student.management.auth.CurrantUser;
import com.insa_talent_student.management.auth.dtoLayer.dto.JwtTokenResponse;
import com.insa_talent_student.management.auth.dtoLayer.dto.LoginRequest;
import com.insa_talent_student.management.auth.entity.UserCredential;
import com.insa_talent_student.management.auth.repository.UserCredentialRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthAPI {

    private final AuthenticationManager authenticationManager;
    private final UserCredentialRepo userCredentialRepo;
    private final JwtService jwtserv;

    @Override
    public CurrantUser getCurrantUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                UserCredential userCredential = (UserCredential) principal;
                return new CurrantUser(
                    userCredential.getId(),
                    userCredential.getUsername(),
                    userCredential.getProfileId(),
                    userCredential.getTalentBatchId()
                );
            }
        }
        return null;
    }

    public JwtTokenResponse login(LoginRequest request) {

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUserName(),
                request.getPassword()
            )
        );

        UserCredential credential = userCredentialRepo.findByUsername(request.getUserName())
            .orElseThrow(() -> new IllegalStateException("User not found"));
        
        String token = jwtserv.generateToken(credential);
        return new JwtTokenResponse(token,credential.getRoles(),"Bearer","Authentication successful");

    }
    public static UserCredential getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                return (UserCredential) principal;
            }
        }
        return null;
    }
    
}
