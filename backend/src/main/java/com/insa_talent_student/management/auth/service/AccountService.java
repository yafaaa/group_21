package com.insa_talent_student.management.auth.service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.security.SecureRandom;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.io.Reader;                     // for Reader
import org.apache.poi.ss.usermodel.Sheet; 

import java.io.ByteArrayOutputStream;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.insa_talent_student.management.auth.dtoLayer.dto.LoginRequest;
import com.insa_talent_student.management.auth.dtoLayer.dto.UserDto;
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
                UserCredential userCredential = createUserCredential(name, password, batchId, season, year);
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

                    String password = generateUniquePassword();
                    UserCredential userCredential = createUserCredential(name, password, batchId, season, year);
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

    public byte[] generateAccountCards(Long id) {
        List<UserCredential> userCredentials = userCredentialRepo.findByTalentBatchId(id);
        if (userCredentials.isEmpty()) {
            throw new RuntimeException("Batch not found with id: " + id);
        }
        try (PDDocument document = new PDDocument()) {

            PDType1Font titleFont = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            PDType1Font normalFont = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            
            int cardsPerRow = 3;
            int cardsPerCol = 5;
            float cardWidth = 180;
            float cardHeight = 150;
            float startX = 30;
            float startY = 820; // top of page
            float gapX = 10;
            float gapY = 10;

            int index = 0;
            PDPage page = new PDPage();
            document.addPage(page);
            PDPageContentStream cs = new PDPageContentStream(document, page);

            for (UserCredential account : userCredentials) {
                int row = index / cardsPerRow % cardsPerCol;
                int col = index % cardsPerRow;

                if (row == 0 && index != 0 && index % (cardsPerRow * cardsPerCol) == 0) {
                    cs.close();
                    page = new PDPage();
                    document.addPage(page);
                    cs = new PDPageContentStream(document, page);
                }

                float x = startX + col * (cardWidth + gapX);
                float y = startY - row * (cardHeight + gapY);

                // Draw card border
                cs.addRect(x, y - cardHeight, cardWidth, cardHeight);
                cs.stroke();

                // Institute name (centered)
                cs.beginText();
                cs.setFont(titleFont, 12);
                cs.newLineAtOffset(x + cardWidth / 2 - 50, y - 40);
                cs.showText("INSA Talent Center");
                cs.endText();

                // Username (top-left)
                cs.beginText();
                cs.setFont(normalFont, 10);
                cs.newLineAtOffset(x + 10, y - 60);
                cs.showText("Username: " + account.getUsername());
                cs.endText();

                // Password (under username)
                cs.beginText();
                cs.setFont(normalFont, 10);
                cs.newLineAtOffset(x + 10, y - 75);
                cs.showText("Password: " + account.getPassword());
                cs.endText();

                // Warning (bottom small text)
                cs.beginText();
                cs.setFont(normalFont, 7);
                cs.newLineAtOffset(x + 10, y - cardHeight + 15);
                cs.showText("Do not share or throw before you login and change your password");
                cs.endText();

                index++;
            }

            cs.close();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        }
        catch (IOException e) {
            throw new RuntimeException("Error generating account cards PDF", e);
        }
    }

    public void addUser(UserDto userDto, Long id) {
        BatchRes batch = studentBatchService.bachInfoOff(id);
        String season = batch.getSeason();
        int year = batch.getYear();

        String password = generateUniquePassword();
        UserCredential userCredential = createUserCredential(userDto.getUserName(), password, id, season, year);
        userCredentialRepo.save(userCredential);
    }

    public LoginRequest getloginData(Long id) {
        UserCredential userCredential = userCredentialRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new LoginRequest(userCredential.getUsername(), userCredential.getPassword());
    }


    private UserCredential createUserCredential(String username, String password, Long batchId, String season, int year) {
        UserCredential userCredential = new UserCredential();
        userCredential.setUsername(generateUsername(username, season, year));
        userCredential.setPassword(password);
        userCredential.setTalentBatchId(batchId);
        return userCredential;
    }
}