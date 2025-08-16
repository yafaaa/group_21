package com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Roomdto {
    private Long id;
    private int roomNumber;
    private int capacity;
}
