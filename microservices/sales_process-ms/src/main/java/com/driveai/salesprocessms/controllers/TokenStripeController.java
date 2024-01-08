package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.dto.FinancingDto;
import com.driveai.salesprocessms.dto.TokenStripeDto;
import com.driveai.salesprocessms.model.Financing;
import com.driveai.salesprocessms.model.TokenStripe;
import com.driveai.salesprocessms.service.TokenStripeService;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/sales-process/token-stripe")
@Hidden
public class TokenStripeController {
    @Autowired
    TokenStripeService tokenStripeService;
    @PostMapping("/create")
    public ResponseEntity<?> createTokenStripe(@RequestBody TokenStripe tokenStripe){
        try{
            tokenStripe = tokenStripeService.saveTokenStripe(tokenStripe);
        }catch (Exception e){

        }
        return new ResponseEntity<>(tokenStripe, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateTokenStripe(@RequestBody TokenStripe tokenStripe){
        try{
            tokenStripe = tokenStripeService.saveTokenStripe(tokenStripe);
        }catch (Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(tokenStripe,HttpStatus.OK);
        }
        return  new ResponseEntity<>(tokenStripe,HttpStatus.OK);
    }
    @GetMapping("/get")
    public  ResponseEntity<?> getAllTokenStripe(){
        return new ResponseEntity<>(tokenStripeService.findAll(),HttpStatus.OK);
    }
    @GetMapping("/find")
    public ResponseEntity<?> findById(@RequestParam("id")int id){
        try{
            TokenStripeDto tokenStripe = tokenStripeService.findByid((id));
            return new ResponseEntity<>(tokenStripe,HttpStatus.OK);
        }catch (Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
