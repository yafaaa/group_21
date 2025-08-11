package com.insa_talent_student.management.studentbachmanagement.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingDetail;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingRequest;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingResponse;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.Roomdto;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dtomapper.DormMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dorms")
@RequiredArgsConstructor
public class DormController {

    private final DormMapper dormMapper;

    // Create a new building
    @PostMapping("/buildings")
    public ResponseEntity<BuildingResponse> createBuilding(@RequestBody BuildingRequest request) {
          BuildingResponse created = dormMapper.createBuilding(request);
        return ResponseEntity.ok().body(created);
    }
    @PostMapping("/rooms/{buildingId}")
    public ResponseEntity<Roomdto> addRoom(@PathVariable Long buildingId, @RequestBody Roomdto request) {
        Roomdto addedRoom = dormMapper.addRoom(buildingId, request);
        return ResponseEntity.ok().body(addedRoom);
    }



    // Get all buildings
    @GetMapping("/buildings")
    public ResponseEntity<List<BuildingDetail>> getAllBuildings() {
        return ResponseEntity.ok(dormMapper.getAllBuildings());
    }

    // Get building by ID
    @GetMapping("/buildings/{id}")
    public ResponseEntity<BuildingDetail> getBuildingById(@PathVariable Long id) {
        return ResponseEntity.ok(dormMapper.getBuildingById(id));
    }

    // Update a building
    @PutMapping("/buildings/{id}")
    public ResponseEntity<BuildingDetail> updateBuilding(@PathVariable Long id, @RequestBody BuildingRequest request) {
        return ResponseEntity.ok(dormMapper.updateBuilding(id, request));
    }
    @PutMapping("/rooms/{id}")
    public ResponseEntity<Roomdto> updateRoom(@PathVariable Long id, @RequestBody Roomdto request) {
        return ResponseEntity.ok(dormMapper.updateRoom(id, request));
    }

    // Delete a building
    @DeleteMapping("/buildings/{id}")
    public ResponseEntity<?> deleteBuilding(@PathVariable Long id) {
        dormMapper.deleteBuilding(id);
        return ResponseEntity.noContent().build();
    }
}
