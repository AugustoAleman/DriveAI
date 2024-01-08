package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.model.Transactions;
import com.driveai.salesprocessms.receiveddto.BasicInfoDto;
import com.driveai.salesprocessms.receiveddto.DealershipNameAddressDto;
import com.driveai.salesprocessms.receivedservices.UserService;
import com.driveai.salesprocessms.receivedservices.VehicleService;
import com.driveai.salesprocessms.service.TransactionsService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/sales-process/transactions")
public class TransactionsController {
    @Autowired
    private TransactionsService transactionsService;
    @Autowired
    private UserService userService;
    @Autowired
    private VehicleService vehicleService;
    @Operation(summary = "Endpoint that shows transactions per dealership by id")

    @GetMapping("/dealership/{dealershipId}")
    public ResponseEntity<?> findDealershipAndTransactionsById(@PathVariable int dealershipId) {
        Optional<DealershipNameAddressDto> dealership = userService.findDealershipById(dealershipId);
        List<Transactions> transactions = transactionsService.findAllTransactionsByDealershipId(dealershipId);

        // Retrieve vehicleBasicInfo for each transaction
        Map<Integer, BasicInfoDto> vehicleBasicInfos = transactions.stream()
                .collect(Collectors.toMap(
                        Transactions::getVehicleId,
                        transaction -> vehicleService.getVehicleBasicInfo(transaction.getVehicleId())
                ));

        // Replace vehicleId and dealershipId with corresponding data and change id to transactionId
        List<Map<String, Object>> transactionsWithVehicleAndDealershipInfo = transactions.stream()
                .map(transaction -> {
                    Map<String, Object> transactionMap = new HashMap<>();
                    transactionMap.put("transactionId", transaction.getId());
                    transactionMap.put("date", transaction.getDate());
                    transactionMap.put("reference", transaction.getReference());
                    transactionMap.put("dealershipInfo", dealership.orElse(null));
                    transactionMap.put("vehicleInfo", vehicleBasicInfos.get(transaction.getVehicleId()));
                    return transactionMap;
                })
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("transactions", transactionsWithVehicleAndDealershipInfo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @Operation(summary = "Endpoint that returns all transactions")

    @GetMapping("/get-all-dealerships")
    public ResponseEntity<?> findAllDealershipsAndTransactions() {
        List<Transactions> transactions = transactionsService.findAllTransactions();

        // Retrieve dealership and vehicleBasicInfo for each transaction
        Map<Integer, DealershipNameAddressDto> dealerships = new HashMap<>();
        Map<Integer, BasicInfoDto> vehicleBasicInfos = new HashMap<>();
        for (Transactions transaction : transactions) {
            dealerships.putIfAbsent(transaction.getDealershipId(), userService.findDealershipById(transaction.getDealershipId()).orElse(null));
            vehicleBasicInfos.putIfAbsent(transaction.getVehicleId(), vehicleService.getVehicleBasicInfo(transaction.getVehicleId()));
        }

        // Group transactions by dealershipId
        Map<Integer, List<Transactions>> transactionsByDealership = transactions.stream()
                .collect(Collectors.groupingBy(Transactions::getDealershipId));

        // Replace vehicleId and dealershipId with corresponding data and change id to transactionId
        List<Map<String, Object>> dealershipsAndTransactions = dealerships.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> dealershipMap = new HashMap<>();
                    dealershipMap.put("dealershipInfo", entry.getValue());
                    dealershipMap.put("transactions", transactionsByDealership.getOrDefault(entry.getKey(), new ArrayList<>()).stream()
                            .map(transaction -> {
                                Map<String, Object> transactionMap = new HashMap<>();
                                transactionMap.put("transactionId", transaction.getId());
                                transactionMap.put("date", transaction.getDate());
                                transactionMap.put("reference", transaction.getReference());
                                transactionMap.put("originAccount", transaction.getOriginAccount());
                                transactionMap.put("type", transaction.getType());
                                transactionMap.put("vehicleInfo", vehicleBasicInfos.get(transaction.getVehicleId()));
                                return transactionMap;
                            })
                            .collect(Collectors.toList()));
                    return dealershipMap;
                })
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("dealershipsAndTransactions", dealershipsAndTransactions);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }






}

