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

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchRequest;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchResponse;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dtomapper.BatchMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/batch")
@RequiredArgsConstructor
public class BatchController {

    private final BatchMapper batchMapper;

    // Create a new building
    @PostMapping
    public ResponseEntity<BatchResponse> createBatch(@RequestBody BatchRequest request) {
        BatchResponse created = batchMapper.createBatch(request);
        return ResponseEntity.ok().body(created);
    }

    // Get all buildings
    @GetMapping
    public ResponseEntity<?> getAllBatches() {
        return ResponseEntity.ok(batchMapper.getAllBatches());
    }

    // Get batch by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBatchById(@PathVariable Long id) {
        return ResponseEntity.ok(batchMapper.getBatchById(id));
    }

    // Update a batch
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBatch(@PathVariable Long id, @RequestBody BatchRequest request) {
        return ResponseEntity.ok(batchMapper.updateBatch(id, request));
    }

    // Delete a batch
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBatch(@PathVariable Long id) {
        batchMapper.deleteBatch(id);
        return ResponseEntity.noContent().build();
    }

    
}
