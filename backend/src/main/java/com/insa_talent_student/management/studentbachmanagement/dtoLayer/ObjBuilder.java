package com.insa_talent_student.management.studentbachmanagement.dtoLayer;

import org.springframework.stereotype.Component;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BachDetail;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchResponse;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingDetail;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingResponse;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.Roomdto;
import com.insa_talent_student.management.studentbachmanagement.entity.Building;
import com.insa_talent_student.management.studentbachmanagement.entity.Room;
import com.insa_talent_student.management.studentbachmanagement.entity.TalentBatch;

@Component
public class ObjBuilder {

    public BatchResponse toBatchResponse(TalentBatch batch) {
        return BatchResponse.builder()
                .season(batch.getSeason())
                .year(batch.getYear())
                .build();
    }
    public  BuildingResponse toBuildingResponse( Building createdBuilding){
        return BuildingResponse.builder()
                .blockNumber(createdBuilding.getBlockNumber())
                .roomCapacity(createdBuilding.getRoomCapacity())
                .totalRooms(createdBuilding.getTotalRooms())
                .build();
    }

    public BachDetail toBachDetail(TalentBatch batch) {
        return BachDetail.builder()
                .id(batch.getId())
                .season(batch.getSeason())
                .year(batch.getYear())
                .buildings(batch.getBuildings()
                        .stream()
                        .map(this::toBuildingDetail)
                        .toList()
                )
                .build();
    }

    public BuildingDetail toBuildingDetail(Building building) {
        return BuildingDetail.builder()
                .id(building.getId())
                .blockNumber(building.getBlockNumber())
                .totalRooms(building.getTotalRooms())
                .roomCapacity(building.getRoomCapacity())
                .bach(building.getTalentBatch() != null
                        ? toBatchResponse(building.getTalentBatch())
                        : null)
                .rooms(building.getRooms()
                        .stream()
                        .map(this::toRoomDto)
                        .toList()
                )
                .build();
    }

    public Roomdto toRoomDto(Room room) {
        return Roomdto.builder()
                .id(room.getId())
                .roomNumber(room.getRoomNumber())
                .capacity(room.getCapacity())
                .build();
    }
}
