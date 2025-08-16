package com.insa_talent_student.management.groupmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "group_memberships")
@Data
@NoArgsConstructor
public class GroupMembership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Reference to User, but only by ID (not entity relation)
    private Long userId;

    // Each membership belongs to one group
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    // You could also store role assignment at membership level
    @Enumerated(EnumType.STRING)
    private MemberRole memberRole; // e.g., ADMIN, MODERATOR, MEMBER

    // getters and setters
}

