package com.driveai.salesprocessms.repository;
import com.driveai.salesprocessms.model.DealershipBankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DealershipBankAccountRepository extends JpaRepository<DealershipBankAccount, Integer> {
    List<DealershipBankAccount> findByAgencyId(int agency_id);
}
