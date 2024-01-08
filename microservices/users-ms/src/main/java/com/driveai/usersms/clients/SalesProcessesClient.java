package com.driveai.usersms.clients;

// Importing factories
import com.driveai.usersms.dto.DealershipDto;
import com.driveai.usersms.dto.UserDto;

// Importing FeignClient dependencies
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="sales-process", url = "https://salesprocess-ms-hft5ojmsba-uw.a.run.app/")
public interface SalesProcessesClient {
    // Get the other services endpoints
}
