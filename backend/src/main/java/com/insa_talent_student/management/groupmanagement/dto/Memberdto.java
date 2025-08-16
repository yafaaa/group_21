package com.insa_talent_student.management.groupmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Memberdto {
    private Long groupid;
    private Long userId ;
}
