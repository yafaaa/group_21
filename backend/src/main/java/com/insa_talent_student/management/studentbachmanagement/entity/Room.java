// com.insa_talent_student.management.studentbachmanagement.entity.Room
package com.insa_talent_student.management.studentbachmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int roomNumber;
    private int capacity;
    
    @ManyToOne
    @JoinColumn(name = "building_id")
    private Building building;
}