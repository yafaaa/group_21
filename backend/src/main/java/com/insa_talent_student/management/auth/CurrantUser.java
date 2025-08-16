package com.insa_talent_student.management.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CurrantUser {
 
    private Long id;
    private String username;
    private Long profileId; 
    private Long talentBatchId;
    
}
