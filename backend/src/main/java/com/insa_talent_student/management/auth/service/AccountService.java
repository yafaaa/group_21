package com.insa_talent_student.management.auth.service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.security.SecureRandom;
import java.util.HashSet;
import java.util.Set;
import java.io.Reader;                     // for Reader
import org.apache.poi.ss.usermodel.Sheet; 

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.insa_talent_student.management.auth.entity.UserCredential;
import com.insa_talent_student.management.auth.repository.UserCredentialRepo;
import com.insa_talent_student.management.studentbachmanagement.StudentBatchService;
import com.insa_talent_student.management.studentbachmanagement.StudentBatchService.BatchRes;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
    private static final int PASSWORD_LENGTH = 10;
    private static final SecureRandom random = new SecureRandom();
    private final StudentBatchService studentBatchService;

    private final UserCredentialRepo userCredentialRepo;
    private final Set<String> generatedPasswords = new HashSet<>();

    public void saveFromCsv(MultipartFile file,Long batchId) throws IOException {
        BatchRes batch = studentBatchService.bachInfoOff(batchId);
        String season = batch.getSeason();
        int year = batch.getYear();

        try (Reader reader = new InputStreamReader(file.getInputStream())) {
           Iterable<CSVRecord> records = CSVFormat.DEFAULT
                                .builder()
                                .setHeader()
                                .setSkipHeaderRecord(true)
                                .build()
                                .parse(reader);
            for (CSVRecord record : records) {

                String name = record.get("name");

                String password = generateUniquePassword();
                UserCredential userCredential = new UserCredential();
                userCredential.setUsername(generateUsername(name, season, year));
                userCredential.setPassword(password); // later hash
                userCredentialRepo.save(userCredential);
                
            }
        }
    }

    public void saveFromExcel(MultipartFile file,Long batchId) throws IOException {
        BatchRes batch = studentBatchService.bachInfoOff(batchId);
        String season = batch.getSeason();
        int year = batch.getYear();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null) {
                    String name = row.getCell(0).getStringCellValue();
                    String email = row.getCell(1).getStringCellValue();

                    String password = generateUniquePassword();
                    UserCredential userCredential = new UserCredential();
                    userCredential.setUsername(generateUsername(name, season, year));
                    userCredential.setPassword(password); // later hash
                    userCredentialRepo.save(userCredential);
                }
            }
        }
    }

    private String generateUsername(String name,String season,int year) {

        return name.toLowerCase()
                .replaceAll(" ", ".")
            + "/" + season
            + "/" + year;
    }

    private String generateUniquePassword() {
        String password;
        do {
            password = generateRandomPassword();
        } while (generatedPasswords.contains(password));
        generatedPasswords.add(password);
        return password;
    }

    private static String generateRandomPassword() {
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            int index = random.nextInt(CHARACTERS.length());
            password.append(CHARACTERS.charAt(index));
        }
        return password.toString();
    }
}
