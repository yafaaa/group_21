package com.insa_talent_student.management.studentbachmanagement.service;

import org.springframework.stereotype.Service;

import com.insa_talent_student.management.studentbachmanagement.entity.TalentBatch;
import com.insa_talent_student.management.studentbachmanagement.repository.TalentBatchRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BatchService {
    private final TalentBatchRepository talentBatchRepository;
    
    public TalentBatch createBatch(TalentBatch talentBatch) {
        return talentBatchRepository.save(talentBatch);
    }
    
}
