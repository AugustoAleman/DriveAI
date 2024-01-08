package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.dto.CommissionsLogDto;
import com.driveai.salesprocessms.service.CommissionsLogService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/sales-process/commissions-log")
public class CommissionsLogController {
    @Autowired
    private CommissionsLogService commissionsLogService;
    @Operation(summary = "Endpoint that allows admin to see all commissions changelog")
    @GetMapping("/getAll")
    public ResponseEntity<List<CommissionsLogDto>> getAllCommissionsLogs() {
        List<CommissionsLogDto> commissionsLogs = commissionsLogService.getAllCommissionsLogs();
        return ResponseEntity.ok(commissionsLogs);
    }
}
