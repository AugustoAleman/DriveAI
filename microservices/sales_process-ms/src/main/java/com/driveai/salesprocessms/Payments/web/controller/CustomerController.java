package com.driveai.salesprocessms.Payments.web.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/v1/sales-process/customer")
public class CustomerController {

    @Autowired
    private StripeService stripeService;

    @GetMapping("/{customerId}")
    public Map<String, Customer>  getCustomerAccount(@PathVariable String customerId) throws StripeException {
        try {
            Customer customer = stripeService.getCustomerAccount(customerId);

            Map<String, Customer> response = new HashMap<>();
            response.put("customerId", customer);
            return response;


        } finally {

        }
    }
}
