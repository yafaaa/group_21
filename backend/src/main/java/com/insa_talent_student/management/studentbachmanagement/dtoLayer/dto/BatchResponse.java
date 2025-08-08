package com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BatchResponse {
    private String season;
    private int year;
}
