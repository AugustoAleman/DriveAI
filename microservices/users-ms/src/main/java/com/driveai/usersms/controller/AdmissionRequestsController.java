package com.driveai.usersms.controller;

import com.driveai.usersms.factory.LogFactory;
import com.driveai.usersms.model.AdmissionRequests;
import com.driveai.usersms.model.Log;
import com.driveai.usersms.model.User;
import com.driveai.usersms.repository.UserRepository;
import com.driveai.usersms.service.AdmissionRequestsService;
import com.driveai.usersms.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequestMapping(path = "/v1/admissionRequests")
public class AdmissionRequestsController {

    @Autowired
    AdmissionRequestsService admissionRequestsService;
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

    //Controller of creaion of Admission Requests
    @PostMapping("/create")
    public ResponseEntity<?> createAdmissionRequests(@RequestBody AdmissionRequests admissionRequests, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            List<String> errors = new ArrayList<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.add(error.getField() + ": " + error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        try {
            admissionRequests = admissionRequestsService.createAdmissionRequests(admissionRequests);
        }catch(Exception e){
            e.printStackTrace();
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(admissionRequests, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAdmissionRequests(@RequestBody AdmissionRequests admissionRequests) {
        try {
            admissionRequests = admissionRequestsService.createAdmissionRequests(admissionRequests);
            //registerLog("UPDATE",
            //        " updated an admission request with id " + admissionRequests.getId(),
            //        "Admission request updated", null, HttpStatus.OK.toString());
            return new ResponseEntity<>(admissionRequests, HttpStatus.OK);

        } catch (Exception e) {
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());
            //registerLog("UPDATE",
            //        " failed to update an admission request with id " + admissionRequests.getId(),
            //       "Admission request updated", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //Controller of delete of Admission Requests

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAdmissionRequests(@PathVariable("id") int id){
        try {
            registerLog("DELETE",
                    " deleted an admission request with id " + id,
                    "Admission request deleted", null, HttpStatus.OK.toString());
            admissionRequestsService.deleteAdmissionRequests(id);
        }catch(Exception e){
            e.printStackTrace();
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());
            registerLog("DELETE",
                    " failed to delete an admission request with id " + id,
                    "Admission request deleted", e.getMessage(), HttpStatus.BAD_REQUEST.toString());
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //Controller of get of Admission Requests
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getAdmissionRequests(@PathVariable("id") int id){
        try {
            AdmissionRequests admissionRequests = admissionRequestsService.getAdmissionRequests(id);
            return new ResponseEntity<>(admissionRequests, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
    }
    //Controller of get all of Admission Requests
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllAdmissionRequests(){
        try {
            List<AdmissionRequests> admissionRequests = admissionRequestsService.getAllAdmissionRequests();
            return new ResponseEntity<>(admissionRequests, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            Map<String,String> response= new HashMap<>();
            response.put("message",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
    }


}
