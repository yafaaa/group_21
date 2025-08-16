package com.insa_talent_student.management.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.insa_talent_student.management.auth.dtoLayer.dto.ChangePasswordRequest;
import com.insa_talent_student.management.auth.entity.UserCredential;
import com.insa_talent_student.management.auth.repository.UserCredentialRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserCredentialService {

    private final UserCredentialRepo userCredentialRepo;
    private final PasswordEncoder passwordEncoder;


    public void changePassword( ChangePasswordRequest request) {
        UserCredential user = AuthService.getAuthenticatedUser();
        // Verify old password matches
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        // Encode and save new password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userCredentialRepo.save(user);
    }
}
