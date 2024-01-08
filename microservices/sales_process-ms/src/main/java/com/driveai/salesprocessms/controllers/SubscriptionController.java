package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.dto.SubscriptionDto;
import com.driveai.salesprocessms.model.Subscription;
import com.driveai.salesprocessms.receiveddto.DealershipNameAddressDto;
import com.driveai.salesprocessms.receivedservices.UserService;
import com.driveai.salesprocessms.service.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/v1/sales-process/subscriptions")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserService userService;
    //Applying exception handler for no dealerships
    @Operation(summary = "Endpoint that returns plan information per dealership by id")
    @GetMapping("/user-complete-plan-info/{userId}")
    public ResponseEntity<Map<String, Object>> findByUserId(@PathVariable int userId) {
        Subscription subscription = subscriptionService.findByUserId(userId);
        Optional<DealershipNameAddressDto> dealership = userService.findDealershipById(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("subscription", subscription);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //THIS MODIFIED THE CODE TO FOLLOW AN SPECIFIC RESPONSE
    @Operation(summary = "Endpoint that returns plan type per dealershipId")
    @GetMapping("/plan-type/{userId}")
    public ResponseEntity<Map<String, Object>> findPlanTypeByUserId(@PathVariable int userId) {
        String planType = subscriptionService.findPlanTypeByUserId(userId);
        Optional<DealershipNameAddressDto> dealership = userService.findDealershipById(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("planType", planType);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @Operation(summary = "Endpoint that returns plan type for every dealership in database")

    @GetMapping("/plan-types")
    public ResponseEntity<List<Map<String, Object>>> findPlanTypesByUserIds(@RequestParam List<Integer> userIds) {
        List<Subscription> subscriptions = subscriptionService.findSubscriptionsByUserIds(userIds);
        List<Map<String, Object>> response = new ArrayList<>();
        for (Subscription subscription : subscriptions) {
            Map<String, Object> subscriptionMap = new HashMap<>();
            subscriptionMap.put("subscription", subscription);
            response.add(subscriptionMap);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @Operation(summary = "Endpoint that allows updates to plans")

    @PutMapping("/update-plan/{userId}")
    public ResponseEntity<Subscription> updateSubscriptionByUserId(@PathVariable int  userId, @RequestBody SubscriptionDto updatedSubscriptionDto) {
        Subscription updatedSubscription = subscriptionService.updateSubscriptionByUserId( userId, updatedSubscriptionDto);
        if (updatedSubscription != null) {
            return ResponseEntity.ok(updatedSubscription);
        } else {
            throw new SubscriptionNotFoundException("The dealership with id: "+  userId +"is not present");
        }
    }
    @ResponseStatus(HttpStatus.NOT_FOUND)
    class SubscriptionNotFoundException extends RuntimeException {
        public SubscriptionNotFoundException(String message) {
            super(message);
        }
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
