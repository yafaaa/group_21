package com.insa_talent_student.management.studentbachmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insa_talent_student.management.studentbachmanagement.entity.TalentBatch;

public interface TalentBatchRepository extends JpaRepository<TalentBatch, Long> {
    // Additional query methods can be defined here if needed
    
}
