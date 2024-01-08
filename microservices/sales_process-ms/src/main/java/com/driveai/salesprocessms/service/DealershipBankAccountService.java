package com.driveai.salesprocessms.service;
import com.driveai.salesprocessms.dto.DealershipBankAccountDto;
import com.driveai.salesprocessms.model.DealershipBankAccount;
import com.driveai.salesprocessms.repository.DealershipBankAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DealershipBankAccountService {
    @Autowired
    private DealershipBankAccountRepository dealershipBankAccountRepository;

    public List<DealershipBankAccountDto> getDealershipBankAccounts() {
        List<DealershipBankAccount> dealershipBankAccounts = dealershipBankAccountRepository.findAll();
        return dealershipBankAccounts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }



    public List<DealershipBankAccountDto> getDealershipBankAccountByAgencyId(int agency_id){
        List<DealershipBankAccount> dealershipBankAccounts = dealershipBankAccountRepository.findByAgencyId(agency_id);
        return dealershipBankAccounts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    public DealershipBankAccount createDealershipBankAccount(DealershipBankAccount dealershipBankAccount) {
        return dealershipBankAccountRepository.save(dealershipBankAccount);
    }


    private DealershipBankAccountDto convertToDTO(DealershipBankAccount dealershipBankAccount) {
        DealershipBankAccountDto dto = new DealershipBankAccountDto();
        dto.setId(dealershipBankAccount.getId());
        dto.setAccountNumber(dealershipBankAccount.getAccountNumber());
        dto.setBank(dealershipBankAccount.getBank());
        dto.setInterbankClabe(dealershipBankAccount.getInterbankClabe());
        dto.setAgencyId(dealershipBankAccount.getAgencyId());
        dto.setModifiedDate(dealershipBankAccount.getModifiedDate());
        dto.setStatus(dealershipBankAccount.getStatus());
        return dto;
    }
}

