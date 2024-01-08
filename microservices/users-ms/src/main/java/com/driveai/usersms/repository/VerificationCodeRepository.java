package com.driveai.usersms.repository;

import com.driveai.usersms.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Integer> {
    Optional<VerificationCode> findByVerificationId(String code);

    Optional<VerificationCode> findByVerificationId(int verificationId);

    Optional<VerificationCode> findByEmail(String email);
}
