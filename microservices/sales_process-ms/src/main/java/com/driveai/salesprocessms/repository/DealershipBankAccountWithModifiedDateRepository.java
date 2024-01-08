package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.model.DealershipBankAccountWithModifiedDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DealershipBankAccountWithModifiedDateRepository extends JpaRepository<DealershipBankAccountWithModifiedDate, Integer> {
    List<DealershipBankAccountWithModifiedDate> findByAgencyId(int agency_id);
}