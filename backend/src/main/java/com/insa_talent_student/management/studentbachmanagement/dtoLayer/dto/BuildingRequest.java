package com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BuildingRequest {
    private String blockNumber;
    private int totalRooms;
    private int roomCapacity;
    private Long batchId; // Talent batch ID to associate the building
}

