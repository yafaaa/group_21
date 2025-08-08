// com.insa_talent_student.management.studentbachmanagement.entity.TalentBatch
package com.insa_talent_student.management.studentbachmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class TalentBatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String season;
    private int year;
    
    @ElementCollection
    private List<Long> studentIds; // List of profile IDs
    
    @ElementCollection
    private List<Long> mentorIds; // List of profile IDs
    
    @OneToMany(mappedBy = "talentBatch", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Building> buildings = new ArrayList<>();

    public void addBuilding(Building building) {
        buildings.add(building);
        building.setTalentBatch(this);
    }
} 