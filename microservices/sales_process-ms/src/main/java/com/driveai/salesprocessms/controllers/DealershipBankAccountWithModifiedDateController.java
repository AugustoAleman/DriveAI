package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.model.DealershipBankAccountWithModifiedDate;
import com.driveai.salesprocessms.service.DealershipBankAccountWithModifiedDateService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/sales-process/bank-account")
public class DealershipBankAccountWithModifiedDateController {
    @Autowired
    private DealershipBankAccountWithModifiedDateService dealershipBankAccountWithModifiedDateService;
    @Operation(summary = "Endpoint that allows to create bank account of dealership")
    @PostMapping("/createBankAccount")
    public ResponseEntity<?> createDealershipBankAccountWithModifiedDate(@RequestBody DealershipBankAccountWithModifiedDate dealershipBankAccountWithModifiedDate) {
        return new ResponseEntity<>(dealershipBankAccountWithModifiedDateService.createDealershipBankAccountWithModifiedDate(dealershipBankAccountWithModifiedDate), HttpStatus.CREATED);
    }
}
