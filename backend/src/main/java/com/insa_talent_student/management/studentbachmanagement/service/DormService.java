package com.insa_talent_student.management.studentbachmanagement.service;


import org.springframework.stereotype.Service;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingRequest;
import com.insa_talent_student.management.studentbachmanagement.entity.Building;
import com.insa_talent_student.management.studentbachmanagement.entity.Room;
import com.insa_talent_student.management.studentbachmanagement.entity.TalentBatch;
import com.insa_talent_student.management.studentbachmanagement.repository.BuildingRepositoery;
import com.insa_talent_student.management.studentbachmanagement.repository.TalentBatchRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DormService {
    private final BuildingRepositoery buildingRepositoery;
    private final TalentBatchRepository talentBatchRepository;

    public Object getAllBuildings() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllBuildings'");
    }

    public Building  createBuilding(Building building, Long batchId) {
        TalentBatch batch = talentBatchRepository.findById(batchId)
            .orElseThrow(() -> new RuntimeException("Batch not found"));

        building.setTalentBatch(batch);
        // Auto-create rooms
        for (int i = 1; i <= building.getTotalRooms(); i++) {
            Room room = new Room();
            room.setRoomNumber( i);
            room.setCapacity(building.getRoomCapacity());
            building.addRoom(room);
        }

        batch.addBuilding(building);
        return buildingRepositoery.save(building);  

    }

    public Object getBuildingById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getBuildingById'");
    }

    public Object updateBuilding(Long id, BuildingRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateBuilding'");
    }

    public void deleteBuilding(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteBuilding'");
    }

  
    
}
