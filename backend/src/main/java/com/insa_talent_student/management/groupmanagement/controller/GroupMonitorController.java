package com.insa_talent_student.management.groupmanagement.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insa_talent_student.management.groupmanagement.dto.GroupDTO;
import com.insa_talent_student.management.groupmanagement.service.GroupMonitor;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupMonitorController {
     private final GroupMonitor groupMonitor;

     
      // ------------------- Batch Groups -------------------

    // Get single batch group
    @GetMapping("/batch/{batchId}")
    public ResponseEntity<GroupDTO> getBatchGroup(@PathVariable Long batchId) {
        GroupDTO group = groupMonitor.getBatchGroup(batchId);
        return ResponseEntity.ok(group);
    }

    // Get all batch groups
    @GetMapping("/batch")
    public ResponseEntity<List<GroupDTO>> getAllBatchGroups() {
        List<GroupDTO> groups = groupMonitor.getAllBatchGroups();
        return ResponseEntity.ok(groups);
    }

    // ------------------- Department Groups -------------------

    // Get all departments of a batch
    @GetMapping("/department/by-batch/{batchId}")
    public ResponseEntity<List<GroupDTO>> getDepartmentsByBatch(@PathVariable Long batchId) {
        List<GroupDTO> groups = groupMonitor.getDepartmentsByBatch(batchId);
        return ResponseEntity.ok(groups);
    }

    // Get single department group
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<GroupDTO> getDepartmentGroup(@PathVariable Long departmentId) {
        GroupDTO group = groupMonitor.getDepartmentGroup(departmentId);
        return ResponseEntity.ok(group);
    }
        // ------------------- Team Groups -------------------

    // Get all teams of a department
    @GetMapping("/team/by-department/{departmentId}")
    public ResponseEntity<List<GroupDTO>> getTeamsByDepartment(@PathVariable Long departmentId) {
        List<GroupDTO> groups = groupMonitor.getTeamsByDepartment(departmentId);
        return ResponseEntity.ok(groups);
    }

    // Get single team group
    @GetMapping("/team/{teamId}")
    public ResponseEntity<GroupDTO> getTeamGroup(@PathVariable Long teamId) {
        GroupDTO group = groupMonitor.getTeamGroup(teamId);
        return ResponseEntity.ok(group);
    }
}
