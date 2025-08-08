// com.insa_talent_student.management.userprofile.entity.UserProfile
package com.insa_talent_student.management.userprofile.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long roomId; // Reference by ID instead of entity
    private Long credentialId; // Reference to auth module by ID
    private Long talentBatchId; // Reference by ID instead of entity
    private String grade;
    private String sex;
    
    @ElementCollection
    private List<String> skills;
    
    private Long departmentId; // Reference by ID instead of entity
}