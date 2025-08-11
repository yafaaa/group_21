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

import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BachDetail;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchRequest;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dto.BatchResponse;
import com.insa_talent_student.management.studentbachmanagement.dtoLayer.dtomapper.BatchMapper;
import com.insa_talent_student.management.studentbachmanagement.entity.Department;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/batch")
@RequiredArgsConstructor
public class BatchController {

    private final BatchMapper batchMapper;

    // Create a new Batch
    @PostMapping
    public ResponseEntity<BatchResponse> createBatch(@RequestBody BatchRequest request) {
        BatchResponse created = batchMapper.createBatch(request);
        return ResponseEntity.ok().body(created);
    }
    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@RequestBody Department request) {
        Department createdDepartment = batchMapper.createDepartment(request);
        return ResponseEntity.ok().body(createdDepartment);
    }

    // Get all Batchs
    @GetMapping
    public ResponseEntity<List<BachDetail>> getAllBatches() {
        return ResponseEntity.ok().body(batchMapper.getAllBatches());
    }

     // Get all Departments
    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok().body(batchMapper.getAllDepartments());
    }

    // Get batch by ID
    @GetMapping("/{id}")
    public ResponseEntity<BachDetail> getBatchById(@PathVariable Long id) {
        BachDetail batch = batchMapper.getBatchById(id);
        return ResponseEntity.ok().body(batch);
    }

    // Update a batch
    @PutMapping("/{id}")
    public ResponseEntity<BachDetail> updateBatch(@PathVariable Long id, @RequestBody BatchRequest request) {
        return ResponseEntity.ok().body(batchMapper.updateBatch(id, request));
    }

    // Delete a batch
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBatch(@PathVariable Long id) {
        batchMapper.deleteBatch(id);
        return ResponseEntity.noContent().build();
    }    
}
