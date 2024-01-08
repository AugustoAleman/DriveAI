package com.driveai.salesprocessms.receivedcontrollers;

import com.driveai.salesprocessms.dto.DealershipBankAccountDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/v1/sales-process/bank-account")
public class PruebaController {
//    @GetMapping("/find-by-agency-id/{agency_id}")
//    public ResponseEntity<List<DealershipBankAccountDto>> findByDealershipBankAccount(@PathVariable int agency_id) {
//        List<DealershipBankAccountDto> accounts = dealershipBankAccountService.getDealershipBankAccountByAgencyId(agency_id);
//        return ResponseEntity.ok(accounts);
//    }
}
