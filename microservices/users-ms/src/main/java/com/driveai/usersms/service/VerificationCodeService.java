package com.driveai.usersms.service;

import com.driveai.usersms.model.VerificationCode;
import com.driveai.usersms.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;

@Service
public class VerificationCodeService {

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    public String randomCode() {
        Random random = new Random();
        StringBuilder codeBuilder = new StringBuilder();

        for(int i = 0; i < 5; i++){
            codeBuilder.append(random.nextInt(10));
        }

        return codeBuilder.toString();
    }

    public VerificationCode createVerificationCode(String email) {
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setVerificationCode(randomCode());
        verificationCode.setEmail(email);
        verificationCode.setCreatedAt(new Date());

        return verificationCodeRepository.save(verificationCode);
    }

    public VerificationCode getVerificationCode(String email) {
        return verificationCodeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));
    }
}
