// com.insa_talent_student.management.studentbachmanagement.entity.Building
package com.insa_talent_student.management.studentbachmanagement.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String blockNumber;
    private int totalRooms;
    private int roomCapacity;

     @ManyToOne
    @JoinColumn(name = "talent_batch_id")
    private TalentBatch talentBatch;

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL)
    private List<Room> rooms= new ArrayList<>();
    public void addRoom(Room room) {
        rooms.add(room);
        room.setBuilding(this);
    }
}