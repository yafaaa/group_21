package com.insa_talent_student.management.studentbachmanagement.dtoLayer.dtomapper;


import java.util.List;

import org.springframework.stereotype.Component;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.ObjBuilder;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingDetail;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingRequest;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingResponse;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.Roomdto;
import com.insa_talent_student.management.studentbachmanagement.entity.Building;
import com.insa_talent_student.management.studentbachmanagement.entity.Room;
import com.insa_talent_student.management.studentbachmanagement.service.DormService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DormMapper {
     private final DormService dormService;
     private final ObjBuilder objBuilder;

     public BuildingResponse createBuilding(BuildingRequest request) {
        Building building = new Building();
        building.setBlockNumber(request.getBlockNumber());
        building.setRoomCapacity(request.getRoomCapacity());
        building.setTotalRooms(request.getTotalRooms());

        Building createdBuilding = dormService.createBuilding(building, request.getBatchId() );
        return objBuilder.toBuildingResponse(createdBuilding);
     }

     public List<BuildingDetail> getAllBuildings() {
        List<Building> buildings = dormService.getAllBuildings();
        return buildings.stream()
                           .map(objBuilder::toBuildingDetail)
                           .toList();
     }

     public BuildingDetail getBuildingById(Long id) {
        Building building = dormService.getBuildingById(id);
        if (building == null) {
            throw new EntityNotFoundException("Building not found");
        }
       return objBuilder.toBuildingDetail(building);
     }

     public BuildingDetail updateBuilding(Long id, BuildingRequest request) {
       Building building = dormService.updateBuilding(id, request);

      return objBuilder.toBuildingDetail(building);
     }

     public void deleteBuilding(Long id) {
        dormService.deleteBuilding(id);
     }

     public Roomdto addRoom(Long id,Roomdto request) {
       Building building = dormService.getBuildingById(id);
        if (building == null) {
            throw new EntityNotFoundException("Building not found");
        }
       Room room = new Room();
       room.setRoomNumber(request.getRoomNumber());
       room.setCapacity(request.getCapacity());

       Room addedRoom = dormService.addRoom(room,building);
       return objBuilder.toRoomDto(addedRoom);
     }

     public Roomdto updateRoom(Long id, Roomdto request) {
       Room room = dormService.updateRoom(id,request);
       return objBuilder.toRoomDto(room);
     }
    
}
