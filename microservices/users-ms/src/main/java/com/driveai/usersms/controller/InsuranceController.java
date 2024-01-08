package com.driveai.usersms.controller;

import com.driveai.usersms.dto.InsurancePriceDto;
import com.driveai.usersms.factory.LogFactory;
import com.driveai.usersms.model.Dealership;
import com.driveai.usersms.model.Insurance;
import com.driveai.usersms.model.Log;
import com.driveai.usersms.model.User;
import com.driveai.usersms.repository.DealershipRepository;
import com.driveai.usersms.repository.UserRepository;
import com.driveai.usersms.service.InsuranceService;
import com.driveai.usersms.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/v1/insurance")
public class InsuranceController {

    @Autowired
    InsuranceService insuranceService;
    @Autowired
    DealershipRepository dealershipRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LogService logService;
    @Autowired
    private LogFactory logFactory;

    private void registerLog(String title, String description, String action, String exception, String statusCode){
        Optional<User> currentUserId = userRepository.findByEmail(logService.getLoggedInUserId());
        Log log = logFactory.createLog(currentUserId.get().getId(), title, "User " + logService.getLoggedInUserId() + description, action, statusCode, logService.getLoggedInUserId(), exception);
        logService.saveLog(log);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createInsurance(
            @RequestBody Insurance insurance){
        try {
            Insurance i = insuranceService.saveInsurance(insurance, false);
            registerLog("CREATE", " created an insurance with id " + i.getId(), "Insurance created", null, HttpStatus.OK.toString());

            return ResponseEntity.ok().body(i);
        } catch (Exception e) {

            registerLog("CREATE", " failed to create an insurance with id " + insurance.getId(), "Insurance created", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateInsurance(
            @RequestBody Insurance insurance){
        try {
            Insurance i = insuranceService.saveInsurance(insurance, true);
            registerLog("UPDATE", " updated an insurance with id " + i.getId(), "Insurance updated", null, HttpStatus.OK.toString());

            return ResponseEntity.ok().body(i);
        } catch (Exception e) {

            registerLog("UPDATE", " failed to update an insurance with id " + insurance.getId(), "Insurance updated", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteInsurance(
            @RequestParam("insuranceId") int insuranceId
    ){
        try {
            insuranceService.deleteInsuranceById(insuranceId);
            registerLog("DELETE", " deleted an insurance with id " + insuranceId, "Insurance deleted", null, HttpStatus.OK.toString());

            return ResponseEntity.ok("Insurance deleted");
        } catch (Exception e) {

            registerLog("DELETE", " failed to delete an insurance with id " + insuranceId, "Insurance deleted", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/link")
    public ResponseEntity<?> linkInsuranceToDealership(
            @RequestParam("insuranceId") int insuranceId,
            @RequestParam("dealershipId") int dealershipId){
        try {
            Optional<Dealership> dealership = dealershipRepository.findById(dealershipId);
            if(dealership.isPresent()){
                Insurance i = insuranceService.linkInsuranceToDealership(insuranceId, dealership.get());
                return ResponseEntity.ok().body(i);
            } else {
                return ResponseEntity.badRequest().body("Dealership not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/unlink")
    public ResponseEntity<?> unlinkInsuranceToDealership(
            @RequestParam("insuranceId") int insuranceId,
            @RequestParam("dealershipId") int dealershipId){
        try {
            insuranceService.unlinkInsuranceFromDealership(insuranceId, dealershipId);
            return ResponseEntity.ok("Insurance unlinked");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getInsurance")
    public ResponseEntity<?> getInsurance(
            @RequestParam("insuranceId") int insuranceId){
        try {
            Insurance i = insuranceService.findInsuranceById(insuranceId);
            return ResponseEntity.ok().body(i);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/listInsurancesByDealership/{dealershipId}")
    public ResponseEntity<?> getInsurancesByDealership(@PathVariable int dealershipId) {
        try {
            List<Insurance> i = insuranceService.listAllInsuranceByDealershipId(dealershipId);
            return ResponseEntity.ok().body(i);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/listInsurances")
    public ResponseEntity<?> listInsurances(){
        try {
            List<Insurance> i = insuranceService.listAllInsurances();
            return ResponseEntity.ok().body(i);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> listAll(){
        try {
            List<Insurance> i = insuranceService.listAll();
            return ResponseEntity.ok().body(i);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getInsurancePrice")
    public ResponseEntity<?> getInsurancePrice(
            @RequestParam("insuranceId") int insuranceId) {
        try {
            InsurancePriceDto i = new InsurancePriceDto(
                    insuranceService.findInsuranceById(insuranceId).getPrice()
            );
            return ResponseEntity.ok().body(i);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
