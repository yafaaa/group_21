package com.insa_talent_student.management.groupmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class groupMessage {
    private Long sanderUserId ;
    private Long resiverGroupid;
    private String message;
}
