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
    private Long credentialId; // Reference to auth module by ID // Reference by ID instead of entity
    private String grade;
    private String sex;

    @ElementCollection
    private List<String> skills;

    private Long departmentId; // Reference by ID instead of entity
}
