package com.driveai.usersms.repository;

import com.driveai.usersms.model.TwoFactorAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TwoFactorAuthRepository extends JpaRepository<TwoFactorAuth, Integer> {
}
