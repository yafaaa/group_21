package com.insa_talent_student.management.studentbachmanagement.dtoLayer.dtomapper;

import org.springframework.stereotype.Component;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchRequest;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchResponse;
import com.insa_talent_student.management.studentbachmanagement.entity.TalentBatch;
import com.insa_talent_student.management.studentbachmanagement.service.BatchService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BatchMapper {
    private final BatchService batchService;

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

    public Object getAllBatches() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllBatches'");
    }

    public Object getBatchById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getBatchById'");
    }

    public Object updateBatch(Long id, BatchRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateBatch'");
    }

    public void deleteBatch(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteBatch'");
    }
}
