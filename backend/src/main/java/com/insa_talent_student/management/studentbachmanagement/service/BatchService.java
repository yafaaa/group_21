package com.insa_talent_student.management.studentbachmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchRequest;
import com.insa_talent_student.management.studentbachmanagement.entity.Department;
import com.insa_talent_student.management.studentbachmanagement.entity.TalentBatch;
import com.insa_talent_student.management.studentbachmanagement.repository.DepartmentRepository;
import com.insa_talent_student.management.studentbachmanagement.repository.TalentBatchRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BatchService {
    private final TalentBatchRepository talentBatchRepository;
    private final DepartmentRepository departmentRepository;

    public TalentBatch createBatch(TalentBatch talentBatch) {
        return talentBatchRepository.save(talentBatch);
    }

    public TalentBatch getBatchById(Long id) {
        return talentBatchRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Batch not found"));
    }

    public List<TalentBatch> getAllBatches() {
        return talentBatchRepository.findAll();
    }

    public TalentBatch updateBatch(Long id, BatchRequest request) {
        TalentBatch batch = getBatchById(id);
        batch.setSeason(request.getSeason());
        batch.setYear(request.getYear());
        return talentBatchRepository.save(batch);
    }

    public void deleteBatch(Long id) {
        talentBatchRepository.deleteById(id);
    }

    public Department createDepartment(Department request) {
        Department newdepartment = new Department();
        newdepartment.setName(request.getName());
        newdepartment.setDescription(request.getDescription());
        return departmentRepository.save(newdepartment);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
    
    
}
