package com.insa_talent_student.management.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insa_talent_student.management.auth.entity.UserCredential;

public interface UserCredentialRepo extends JpaRepository<UserCredential, Long> {
    Optional<UserCredential> findByUsername(String username);
    List<UserCredential> findByTalentBatchId(Long id);
}
