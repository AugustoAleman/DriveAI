package com.driveai.salesprocessms.controllers;

import com.driveai.salesprocessms.dto.complexdto.CarPriceSumByYearDto;
import com.driveai.salesprocessms.dto.complexdto.CompletedDetailsDto;
import com.driveai.salesprocessms.receiveddto.NameDto;
import com.driveai.salesprocessms.receivedservices.UserService;
import com.driveai.salesprocessms.receivedservices.VehicleService;
import com.driveai.salesprocessms.service.InvoiceService;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@RestController
@RequestMapping("/v1/mock")
@Hidden
public class MockController {
    @Autowired
private InvoiceService invoiceService;
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private UserService userService;
    @GetMapping("/salesman-completed-sales")
    public ResponseEntity<?> findCompletedDetailsBySellerIdAndMonthAndYear(@RequestParam int salesmanId, @RequestParam(required = false) String month, @RequestParam(required = false) Integer year) {
        Optional<NameDto> salesman = userService.findSalesmanNameById(salesmanId);
        if (salesman.isPresent()) {
            List<CompletedDetailsDto> completedDetails = invoiceService.findCompletedDetailsBySellerIdAndMonthAndYear(salesmanId, month, year);
            Map<String, Object> response = new HashMap<>();
            response.put("salesmanName", salesman.get());
            response.put("sales", completedDetails);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/salesman-pending-sales")
    public ResponseEntity<?> findPendingDetailsBySellerIdAndMonthAndYear(@RequestParam int salesmanId, @RequestParam(required = false) String month, @RequestParam(required = false) Integer year) {
        Optional<NameDto> salesman = userService.findSalesmanNameById(salesmanId);
        if (salesman.isPresent()) {
            List<CompletedDetailsDto> pendingDetails = invoiceService.findPendingDetailsBySellerIdAndMonthAndYear(salesmanId, month, year);
            Map<String, Object> response = new HashMap<>();
            response.put("salesmanName", salesman.get());
            response.put("sales", pendingDetails);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/salesStatus")
    public ResponseEntity<?> findCompletedDetailsByDealershipIdAndMonthAndYear(@RequestParam int dealershipId, @RequestParam(required = false) String month, @RequestParam(required = false) Integer year) {
        List<CompletedDetailsDto> completedDetails = invoiceService.findCompletedDetailsByDealershipIdAndMonthAndYear(dealershipId, month, year);
        return new ResponseEntity<>(completedDetails, HttpStatus.OK);
    }
    @GetMapping("/sold-cars")
    public ResponseEntity<List<CarPriceSumByYearDto>> getCompletedSum(@RequestParam int dealershipId,
                                                                      @RequestParam(required = false) String month,
                                                                      @RequestParam(required = false) Integer year) {
        List<CarPriceSumByYearDto> completedSum = invoiceService.getCompletedSum(dealershipId, month, year);
        return ResponseEntity.ok(completedSum);
    }
}
