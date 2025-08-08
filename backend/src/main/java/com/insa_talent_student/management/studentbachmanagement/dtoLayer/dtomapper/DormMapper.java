package com.insa_talent_student.management.studentbachmanagement.dtoLayer.dtomapper;


import org.springframework.stereotype.Component;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingRequest;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingResponse;
import com.insa_talent_student.management.studentbachmanagement.entity.Building;
import com.insa_talent_student.management.studentbachmanagement.service.DormService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DormMapper {
     private final DormService dormService;

     public BuildingResponse createBuilding(BuildingRequest request) {
        Building building = new Building();
        building.setBlockNumber(request.getBlockNumber());
        building.setRoomCapacity(request.getRoomCapacity());
        building.setTotalRooms(request.getTotalRooms());

        Building createdBuilding = dormService.createBuilding(building, request.getBatchId() );

        BuildingResponse buildingResponse = new BuildingResponse();
         buildingResponse.setBlockNumber(createdBuilding.getBlockNumber());
         buildingResponse.setRoomCapacity(createdBuilding.getRoomCapacity());
         buildingResponse.setTotalRooms(createdBuilding.getTotalRooms());

        return buildingResponse;
     }

     public Object getAllBuildings() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllBuildings'");
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
