package com.insa_talent_student.management.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.insa_talent_student.management.auth.dtoLayer.dtoMapper.AdminMapper;
import com.insa_talent_student.management.auth.dtoLayer.dtoMapper.AuthMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminMapper adminMapper;

    @PostMapping("/students/upload/{id}")
    public ResponseEntity<String> uploadStudents(@RequestParam("file") MultipartFile file, @PathVariable Long id) {
        // 1. Validate file
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload a file!");
        }

        String fileName = file.getOriginalFilename();
        try {
            if (fileName != null && fileName.endsWith(".csv")) {
                // process CSV
                adminMapper.saveuserFromCsv(file,id);
            } else if (fileName != null && (fileName.endsWith(".xls") || fileName.endsWith(".xlsx"))) {
                // process Excel
                adminMapper.saveuserFromExcel(file,id);
            } else {
                return ResponseEntity.badRequest().body("Unsupported file type. Please upload CSV or Excel.");
            }

            return ResponseEntity.ok("File uploaded and students saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file: " + e.getMessage());
        }
    }

}
