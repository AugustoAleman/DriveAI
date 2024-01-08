package com.driveai.usersms.controller;

import com.driveai.usersms.model.Log;
import com.driveai.usersms.service.LogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/v1/user/log")
public class LogController {

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @GetMapping("/fetch")
    public ResponseEntity<?> fetchUserLogs(){
        try{
            Iterable<Log> logs = logService.fetchUserLogs();
            return new ResponseEntity<>(logs, HttpStatus.OK);

        } catch (Exception e){

            HashMap<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());

            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

}
