package com.insa_talent_student.management.auth.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.insa_talent_student.management.auth.dtoLayer.dto.LoginRequest;
import com.insa_talent_student.management.auth.dtoLayer.dto.UserDto;
import com.insa_talent_student.management.auth.dtoLayer.dtoMapper.AdminMapper;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminMapper adminMapper;

    @PostMapping("/students/upload/{batchId}")
    public ResponseEntity<String> uploadStudents(@RequestParam("file") MultipartFile file, @PathVariable Long batchId) {
        // 1. Validate file
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload a file!");
        }

        String fileName = file.getOriginalFilename();
        try {
            if (fileName != null && fileName.endsWith(".csv")) {
                // process CSV
                adminMapper.saveuserFromCsv(file,batchId);
            } else if (fileName != null && (fileName.endsWith(".xls") || fileName.endsWith(".xlsx"))) {
                // process Excel
                adminMapper.saveuserFromExcel(file,batchId);
            } else {
                return ResponseEntity.badRequest().body("Unsupported file type. Please upload CSV or Excel.");
            }

            return ResponseEntity.ok("File uploaded and students saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file: " + e.getMessage());
        }
    }

    @PostMapping("/student/add/{batchId}")
    public ResponseEntity<String> addeuser(@RequestBody UserDto userDto, @PathVariable Long batchId) {
        adminMapper.addUser(userDto, batchId);
        // 1. Validate file
        return ResponseEntity.ok("student added successfully.");
    }
    @PostMapping("/student/resetpassword/{ProfileId}")
    public ResponseEntity<String> resetpassword( @PathVariable Long ProfileId) {
        adminMapper.resetpassword(ProfileId);
        // 1. Validate file
        return ResponseEntity.ok("student added successfully.");
    }
    @GetMapping("/account-card/{ProfileId}")
    public ResponseEntity<LoginRequest> getAccountsCards(@PathVariable Long ProfileId) {
        // List<UserCredential> accounts = userCredentialRepo.findAll();
        LoginRequest loginData = adminMapper.getloginData(ProfileId);
        return ResponseEntity.ok(loginData);
    }

    @GetMapping("/accounts-cards-pdf/{batchId}")
    public ResponseEntity<byte[]> downloadCardsPdf(@PathVariable Long batchId) throws IOException {
        // List<UserCredential> accounts = userCredentialRepo.findAll();
        byte[] pdfBytes = adminMapper.generateAccountCards(batchId);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=accounts_cards.pdf")
            .contentType(MediaType.APPLICATION_PDF)
            .body(pdfBytes);
    }

}
