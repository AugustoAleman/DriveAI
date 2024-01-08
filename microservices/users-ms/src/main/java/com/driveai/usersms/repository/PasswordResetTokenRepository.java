package com.driveai.usersms.repository;

import com.driveai.usersms.model.PasswordResetToken;
import com.driveai.usersms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUserId(int userId);
}
