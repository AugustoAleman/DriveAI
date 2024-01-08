package com.driveai.salesprocessms.receivedcontrollers;
import com.driveai.salesprocessms.receiveddto.*;
import com.driveai.salesprocessms.receiveddto.NameDto;
import com.driveai.salesprocessms.receivedservices.UserService;
import feign.FeignException;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

//Controller Feign Client Example
@RestController
@RequestMapping("/v1/sales-process/user")
public class ReceivedUserController {
    @Autowired
    private UserService userService;
    @Operation(summary = "Feign Client endpoint that finds salesmanName by id")

    @GetMapping("/findSalesmanName/{id}")
    public ResponseEntity<NameDto> findSalesmanNameById(@PathVariable int id) {
        Optional<NameDto> salesman = userService.findSalesmanNameById(id);
        if (salesman.isPresent()) {
            return new ResponseEntity<>(salesman.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @Operation(summary = "Feign Client endpoint that finds dealershipName by id")

    @GetMapping("/findDealershipNameAddress/{id}")
    public ResponseEntity<DealershipNameAddressDto> findDealershipById(@PathVariable("id") int id) {
        Optional<DealershipNameAddressDto> dealership = userService.findDealershipById(id);
        if (dealership.isPresent()) {
            return new ResponseEntity<>(dealership.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @Operation(summary = "Feign Client endpoint that finds any user name by id")
    @GetMapping("/findNameById/{id}")
    public ResponseEntity<?> findNameById(@PathVariable int id) {
        Optional<?> name = userService.findNameById(id);
        if (name.isPresent()) {
            return new ResponseEntity<>(name.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @Operation(summary = "Feign Client endpoint that gets insurance information by Id")
    @GetMapping("/getInsurance")
    public ResponseEntity<InsuranceDto> getInsurance(@RequestParam("insuranceId") int insuranceId) {
        Optional<InsuranceDto> insurance = userService.getInsurance(insuranceId);
        if (insurance.isPresent()) {
            return ResponseEntity.ok(insurance.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    //name, surname, cellphone, email
    @Operation(summary = "Feign Client endpoint that retrieves user data")
    @GetMapping("/data/{id}")
    public ResponseEntity<?> getUserDataById(@PathVariable int id) {
        Optional<UserDataDto> userData = userService.findDataById(id);
        if (userData.isPresent()) {
            return ResponseEntity.ok(userData.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/findNameById2/{id}")
    public ResponseEntity<?> findNameById2(@PathVariable int id) {
        Optional<?> name = userService.findById(id);
        if (name.isPresent()) {
            return new ResponseEntity<>(name.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




}
