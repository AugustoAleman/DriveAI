package com.driveai.salesprocessms.dto.complexdto;

import com.driveai.salesprocessms.dto.DealershipBankAccountDto;
import com.driveai.salesprocessms.dto.DealershipNameDto;

public class DealershipBankAccountResponseDto {
    private DealershipBankAccountDto dealershipBankAccount;
    private DealershipNameDto dealershipName;

    public DealershipBankAccountDto getDealershipBankAccount() {
        return dealershipBankAccount;
    }

    public void setDealershipBankAccount(DealershipBankAccountDto dealershipBankAccount) {
        this.dealershipBankAccount = dealershipBankAccount;
    }

    public DealershipNameDto getDealershipName() {
        return dealershipName;
    }

    public void setDealershipName(DealershipNameDto dealershipName) {
        this.dealershipName = dealershipName;
    }
}




