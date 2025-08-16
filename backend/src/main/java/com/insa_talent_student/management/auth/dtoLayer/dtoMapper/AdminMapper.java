package com.insa_talent_student.management.auth.dtoLayer.dtoMapper;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.insa_talent_student.management.auth.dtoLayer.dto.LoginRequest;
import com.insa_talent_student.management.auth.dtoLayer.dto.UserDto;
import com.insa_talent_student.management.auth.service.AccountService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminMapper {
    private final AccountService accountService;

    public void saveuserFromCsv(MultipartFile file, Long batchId) {
        try {
            accountService.saveFromCsv(file, batchId);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } // Assuming batchId is not needed for CSV

    }

    public void saveuserFromExcel(MultipartFile file, Long batchId) {
        try {
            accountService.saveFromExcel(file, batchId);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public byte[] generateAccountCards(Long batchId) {
        return accountService.generateAccountCards(batchId);
    }

    public void addUser(UserDto userDto, Long batchId) {
        accountService.addUser(userDto, batchId);
    }

    public LoginRequest getloginData(Long ProfileId) {
        return accountService.getloginData(ProfileId);
    }

    public void resetpassword(Long profileId) {
        accountService.resetpassword(profileId);
    }
    
}
