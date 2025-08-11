package com.insa_talent_student.management.studentbachmanagement.dtoLayer.dtomapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.ObjBuilder;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BachDetail;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchRequest;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchResponse;
import com.insa_talent_student.management.studentbachmanagement.entity.Department;
import com.insa_talent_student.management.studentbachmanagement.entity.TalentBatch;
import com.insa_talent_student.management.studentbachmanagement.service.BatchService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BatchMapper {
    private final BatchService batchService;
    private final ObjBuilder objBuilder;

    public BatchResponse createBatch(BatchRequest request) {
        TalentBatch talentBatch = new TalentBatch ();
               talentBatch.setSeason(request.getSeason());
               talentBatch.setYear(request.getYear());
        TalentBatch createdTalentBatch = batchService.createBatch(talentBatch);

        return BatchResponse.builder()
                .season(createdTalentBatch.getSeason())
                .year(createdTalentBatch.getYear())
                .build();
    }

    public List<BachDetail> getAllBatches() {
    List<TalentBatch> batches = batchService.getAllBatches();

    return batches.stream()
            .map(objBuilder::toBachDetail)
            .toList();
    }

    public BachDetail getBatchById(Long id) {
       TalentBatch batch = batchService.getBatchById(id);
       if (batch == null) {
           throw new EntityNotFoundException("Batch not found");
       }

       return objBuilder.toBachDetail(batch);
    }

    public BachDetail updateBatch(Long id, BatchRequest request) {
        TalentBatch updatedBatch = batchService.updateBatch(id, request);

        return objBuilder.toBachDetail(updatedBatch);
    }

    public void deleteBatch(Long id) {
        batchService.deleteBatch(id);
    }

    public Department createDepartment(Department request) {
        return batchService.createDepartment(request);
    }

    public List<Department> getAllDepartments() {
        return batchService.getAllDepartments();
    }
}
