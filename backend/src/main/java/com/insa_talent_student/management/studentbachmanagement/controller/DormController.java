package com.insa_talent_student.management.studentbachmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingRequest;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BuildingResponse;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dtomapper.DormMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dorms")
@RequiredArgsConstructor
public class DormController {

    private final DormMapper dormMapper;

    // Create a new building
    @PostMapping
    public ResponseEntity<BuildingResponse> createBuilding(@RequestBody BuildingRequest request) {
          BuildingResponse created = dormMapper.createBuilding(request);
        return ResponseEntity.ok().body(created);
    }

    // Get all buildings
    @GetMapping
    public ResponseEntity<?> getAllBuildings() {
        return ResponseEntity.ok(dormMapper.getAllBuildings());
    }

    // Get building by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBuildingById(@PathVariable Long id) {
        return ResponseEntity.ok(dormMapper.getBuildingById(id));
    }

    // Update a building
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBuilding(@PathVariable Long id, @RequestBody BuildingRequest request) {
        return ResponseEntity.ok(dormMapper.updateBuilding(id, request));
    }

    // Delete a building
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBuilding(@PathVariable Long id) {
        dormMapper.deleteBuilding(id);
        return ResponseEntity.noContent().build();
    }
}
