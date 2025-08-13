package com.insa_talent_student.management.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insa_talent_student.management.auth.dtoLayer.dto.ChangePasswordRequest;
import com.insa_talent_student.management.auth.service.UserCredentialService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class Usercontroller {
    private final UserCredentialService userCredentialService;

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request) {

        userCredentialService.changePassword( request);
        return ResponseEntity.ok("Password changed successfully");
    }
    
}
