package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.model.Transactions;
import com.driveai.salesprocessms.repository.TransactionsRepository;
import com.stripe.model.financialconnections.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionsService {
    @Autowired
    private TransactionsRepository transactionsRepository;

    public List<Transactions> findAllTransactionsByDealershipId(int dealershipId) {
        return transactionsRepository.findAllByDealershipId(dealershipId);
    }
    public List<Transactions> findAllTransactions() {
        return transactionsRepository.findAll();
    }


}

