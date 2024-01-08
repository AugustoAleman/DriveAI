package com.driveai.usersms.service;

import com.driveai.usersms.model.Log;
import com.driveai.usersms.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class LogService {

    @Autowired
    private LogRepository logRepository;

    public Log saveLog(Log log) {
        log.setCreatedAt(new Date());
        return logRepository.save(log);
    }

    public Iterable<Log> fetchUserLogs() {
        return logRepository.findAll();
    }

    public String getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String username = jwt.getClaim("preferred_username");

        return username;
    }
}
