package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.model.DealershipBankAccountWithModifiedDate;
import com.driveai.salesprocessms.repository.DealershipBankAccountWithModifiedDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealershipBankAccountWithModifiedDateService {
    @Autowired
    private DealershipBankAccountWithModifiedDateRepository dealershipBankAccountWithModifiedDateRepository;

    public List<DealershipBankAccountWithModifiedDate> getDealershipBankAccountsWithModifiedDate() {
        return dealershipBankAccountWithModifiedDateRepository.findAll();
    }

    public List<DealershipBankAccountWithModifiedDate> getDealershipBankAccountWithModifiedDateByAgencyId(int agency_id){
        return dealershipBankAccountWithModifiedDateRepository.findByAgencyId(agency_id);
    }

    public DealershipBankAccountWithModifiedDate createDealershipBankAccountWithModifiedDate(DealershipBankAccountWithModifiedDate dealershipBankAccountWithModifiedDate) {
        return dealershipBankAccountWithModifiedDateRepository.save(dealershipBankAccountWithModifiedDate);
    }
}
