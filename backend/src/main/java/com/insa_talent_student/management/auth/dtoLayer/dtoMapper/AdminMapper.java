package com.insa_talent_student.management.auth.dtoLayer.dtoMapper;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.insa_talent_student.management.auth.service.AccountService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminMapper {
    private final AccountService accountService;

    public void saveuserFromCsv(MultipartFile file, Long id) {
        try {
            accountService.saveFromCsv(file, id);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } // Assuming batchId is not needed for CSV

    }

    public void saveuserFromExcel(MultipartFile file, Long id) {
        try {
            accountService.saveFromExcel(file, id);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
