package com.driveai.salesprocessms.controllers;

import com.driveai.salesprocessms.dto.PriceAndDatesDto;
import com.driveai.salesprocessms.service.AutomotiveGroupSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/v1/sales-process/automotive-group-subscription")
public class AutomotiveGroupSubscriptionController {
    @Autowired
    private AutomotiveGroupSubscriptionService automotiveGroupSubscriptionService;
    //All automotive group endpoints.
    @GetMapping("/{automotiveGroupId}/plan-type")
    public ResponseEntity<String> getPlanTypeByAutomotiveGroupId(@PathVariable int automotiveGroupId) {
        String planType = automotiveGroupSubscriptionService.getPlanTypeByAutomotiveGroupId(automotiveGroupId);
        return ResponseEntity.ok(planType);
    }

    @GetMapping("/{automotiveGroupId}/price-and-dates")
    public ResponseEntity<PriceAndDatesDto> getPriceAndDatesByAutomotiveGroupId(@PathVariable int automotiveGroupId) {
        PriceAndDatesDto priceAndDates = automotiveGroupSubscriptionService.getPriceAndDatesByAutomotiveGroupId(automotiveGroupId);
        return ResponseEntity.ok(priceAndDates);
    }

    @GetMapping("/total-price-by-month/{month}")
    public BigDecimal getTotalPriceByMonth(@PathVariable String month) {
        return automotiveGroupSubscriptionService.getTotalPriceByMonth(month);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        // Handle the exception here
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}