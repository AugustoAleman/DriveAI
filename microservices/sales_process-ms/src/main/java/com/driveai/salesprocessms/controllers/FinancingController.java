package com.driveai.salesprocessms.controllers;

import com.driveai.salesprocessms.dto.FinancingDto;
import com.driveai.salesprocessms.model.Financing;
import com.driveai.salesprocessms.service.FinancingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/sales-process/financing")
public class FinancingController {
    @Autowired
    FinancingService financingService;
    @PostMapping("/create")
    public ResponseEntity<?> createFinancing(@RequestBody Financing financing){
        try{
            financing = financingService.saveFinancing(financing);
        }catch (Exception e){

        }
        return new ResponseEntity<>(financing, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateFinancing(@RequestBody Financing financing){
        try{
            financing = financingService.saveFinancing(financing);
        }catch (Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(financing,HttpStatus.OK);
        }
        return  new ResponseEntity<>(financing,HttpStatus.OK);
    }
    @GetMapping("/get")
    public  ResponseEntity<?> getAllFinancing(){
        return new ResponseEntity<>(financingService.findAll(),HttpStatus.OK);
    }
    @GetMapping("/find")
    public ResponseEntity<?> findById(@RequestParam("id")int id){
        try{
            FinancingDto financing = financingService.findByid((id));
            return new ResponseEntity<>(financing,HttpStatus.OK);
        }catch (Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
