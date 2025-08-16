package com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BuildingDetail {
    private Long id;
    private String blockNumber;
    private int totalRooms;
    private int roomCapacity;

    private BatchResponse bach;

    private List<Roomdto> rooms;
    
}
