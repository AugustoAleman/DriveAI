package com.driveai.usersms.controller;

import com.driveai.usersms.dto.EmailDto;
import com.driveai.usersms.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping ("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailDto emailDto) {
        try {
            emailService.sendMessage(emailDto.getToEmail(), emailDto.getSubject(), emailDto.getBody());

            return new ResponseEntity<>(emailDto, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
