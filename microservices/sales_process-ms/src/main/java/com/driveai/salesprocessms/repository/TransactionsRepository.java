package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Integer> {
    List<Transactions> findAllByDealershipId(int dealershipId);

}
