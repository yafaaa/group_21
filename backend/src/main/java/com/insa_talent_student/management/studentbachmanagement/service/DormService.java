package com.insa_talent_student.management.studentbachmanagement.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingRequest;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.Roomdto;
import com.insa_talent_student.management.studentbachmanagement.entity.Building;
import com.insa_talent_student.management.studentbachmanagement.entity.Room;
import com.insa_talent_student.management.studentbachmanagement.entity.TalentBatch;
import com.insa_talent_student.management.studentbachmanagement.repository.BuildingRepositoery;
import com.insa_talent_student.management.studentbachmanagement.repository.RoomRepositoery;
import com.insa_talent_student.management.studentbachmanagement.repository.TalentBatchRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DormService {
    private final BuildingRepositoery buildingRepositoery;
    private final TalentBatchRepository talentBatchRepository;
    private final RoomRepositoery roomRepositoery;

    public List<Building> getAllBuildings() {
        return buildingRepositoery.findAll();
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

    public Building getBuildingById(Long id) {
        return buildingRepositoery.findById(id)
            .orElseThrow(() -> new RuntimeException("Building not found"));
    }

    public Building updateBuilding(Long id, BuildingRequest request) {

        Building building = getBuildingById(id);
        building.setBlockNumber(request.getBlockNumber());
        building.setRoomCapacity(request.getRoomCapacity());
        building.setTotalRooms(request.getTotalRooms());
        return buildingRepositoery.save(building);
    }

    public void deleteBuilding(Long id) {
        buildingRepositoery.deleteById(id);
    }

    public Room addRoom(Room room, Building building) {
        building.addRoom(room);
        buildingRepositoery.save(building);
        return room;
    }

    public Room updateRoom(Long id, Roomdto request) {
        Room room = roomRepositoery.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found"));
        room.setRoomNumber(request.getRoomNumber());
        room.setCapacity(request.getCapacity());
        return roomRepositoery.save(room);
    }
}
