package com.driveai.usersms.service;

import com.driveai.usersms.model.PasswordResetToken;
import com.driveai.usersms.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    public PasswordResetToken createPasswordResetToken(Integer userId) {
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setUserId(userId);
        passwordResetToken.setToken(UUID.randomUUID().toString());
        passwordResetToken.setCreatedAt(new Date());

        return passwordResetTokenRepository.save(passwordResetToken);
    }

    public PasswordResetToken getPasswordResetToken(String token) {
        return passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
    }

    public void deletePasswordResetToken(PasswordResetToken passwordResetToken) {
        passwordResetTokenRepository.delete(passwordResetToken);
    }
}
