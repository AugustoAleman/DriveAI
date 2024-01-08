package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.dto.DealershipNameDto;
import com.driveai.salesprocessms.dto.complexdto.DealershipBankAccountResponseDto;
import com.driveai.salesprocessms.dto.DealershipBankAccountDto;
import com.driveai.salesprocessms.model.DealershipBankAccount;
import com.driveai.salesprocessms.receiveddto.DealershipNameAddressDto;
import com.driveai.salesprocessms.receivedservices.UserService;
import com.driveai.salesprocessms.repository.DealershipBankAccountRepository;
import com.driveai.salesprocessms.service.DealershipBankAccountService;
import feign.FeignException;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/sales-process/bank-account")
public class DealershipBankAccountController {
    @Autowired
    private DealershipBankAccountService dealershipBankAccountService;
    @Autowired
    private UserService userService;
    @Autowired
    private DealershipBankAccountRepository dealershipBankAccountRepository;

    //Finding by Agency Id
    @Operation(summary = "Endpoint that allows to find bank account of dealership by dealershipId")
    @GetMapping("/find-by-agency-id/{agency_id}")
    public ResponseEntity<List<DealershipBankAccountResponseDto>> findByDealershipBankAccount(@PathVariable int agency_id) {
        List<DealershipBankAccountDto> accounts = dealershipBankAccountService.getDealershipBankAccountByAgencyId(agency_id);
        Optional<DealershipNameAddressDto> dealership = userService.findDealershipById(agency_id);

        DealershipNameDto dealershipName = dealership.map(d -> {
            DealershipNameDto dto = new DealershipNameDto();
            dto.setName(d.getName());
            return dto;
        }).orElse(null);

        List<DealershipBankAccountResponseDto> response = accounts.stream()
                .map(account -> {
                    DealershipBankAccountResponseDto dto = new DealershipBankAccountResponseDto();
                    dto.setDealershipBankAccount(account);
                    dto.setDealershipName(dealershipName);
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Endpoint that allows to find bank account of dealership by dealershipId")
@GetMapping("/list")
public ResponseEntity<List<DealershipBankAccountResponseDto>> getAllDealershipBankAccounts() {
    List<DealershipBankAccount> dealershipBankAccounts = dealershipBankAccountRepository.findAll();
    List<Integer> agencyIds = dealershipBankAccounts.stream()
            .map(DealershipBankAccount::getAgencyId)
            .distinct()
            .collect(Collectors.toList());

    List<DealershipBankAccountResponseDto> response = new ArrayList<>();
    for (int agencyId : agencyIds) {
        List<DealershipBankAccountDto> accounts = dealershipBankAccountService.getDealershipBankAccountByAgencyId(agencyId);
        Optional<DealershipNameAddressDto> dealership;
        try {
            dealership = userService.findDealershipById(agencyId);
        } catch (FeignException e) {
            // Handle the error here (e.g., log it)
            dealership = Optional.empty();
        }

        DealershipNameDto dealershipName = dealership.map(d -> {
            DealershipNameDto dto = new DealershipNameDto();
            dto.setName(d.getName());
            return dto;
        }).orElse(null);

        List<DealershipBankAccountResponseDto> agencyResponse = accounts.stream()
                .map(account -> {
                    DealershipBankAccountResponseDto dto = new DealershipBankAccountResponseDto();
                    dto.setDealershipBankAccount(account);
                    dto.setDealershipName(dealershipName);
                    return dto;
                })
                .filter(dto -> dto.getDealershipName() != null)
                .collect(Collectors.toList());

        response.addAll(agencyResponse);
    }

    return ResponseEntity.ok(response);
}

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}


