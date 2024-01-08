package com.driveai.salesprocessms.repository;
import com.driveai.salesprocessms.model.Commissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommissionsRepository extends JpaRepository<Commissions, Integer> {
}
