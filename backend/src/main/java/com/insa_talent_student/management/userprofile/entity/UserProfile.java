package com.insa_talent_student.management.userprofile.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(
    indexes = {
        @Index(name = "idx_userprofile_room_id", columnList = "roomId")
    }
)
@Data
@NoArgsConstructor
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long roomId; // ✅ Indexed for faster "find all students in this room"
    private Long credentialId; // Reference to auth module by ID
    private Long talentBatchId; // Reference by ID instead of entity
    private String sex;

    private String grade;
    private List<TechStack> techStacks;

    private String familyPhone;
    private String address;

    private Long departmentId; // Reference by ID instead of entity
}
