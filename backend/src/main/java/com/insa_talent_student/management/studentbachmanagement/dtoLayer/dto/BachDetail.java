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
public class BachDetail {

    private Long id;
    private String season;
    private int year;

    private List<BuildingDetail> buildings;
    
}