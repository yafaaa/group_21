package com.insa_talent_student.management.groupmanagement.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupDTO {
    private Long batchId;
    private Long departmentId;
    private Integer maxSize;
}
