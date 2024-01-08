package com.driveai.usersms.controller;

import com.driveai.usersms.service.MockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/v1/mock")
public class MockController {
    @Autowired
    MockService mockService;

    @GetMapping("/lastTransactions")
    public ResponseEntity<List<Map<String, String>>> getLastTransactions() {
        List<Map<String, String>> transactions = mockService.getLastTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/bankAccounts")
    public ResponseEntity<List<Map<String, String>>> getBankAccounts() {
        List<Map<String, String>> bankAccounts = mockService.getBankAccounts();
        return new ResponseEntity<>(bankAccounts, HttpStatus.OK);
    }

    @GetMapping("/bankAccountsHistory")
    public ResponseEntity<List<Map<String, String>>> getBankAccountsHistory() {
        List<Map<String, String>> bankAccounts = mockService.getBankAccountsHistory();
        return new ResponseEntity<>(bankAccounts, HttpStatus.OK);
    }
    @GetMapping("/getSalesProcess")
    public ResponseEntity<List<Map<String, String>>> getSalesProcess() {
        List<Map<String, String>> bankAccounts = mockService.getSalesProcess();
        return new ResponseEntity<>(bankAccounts, HttpStatus.OK);
    }
}
