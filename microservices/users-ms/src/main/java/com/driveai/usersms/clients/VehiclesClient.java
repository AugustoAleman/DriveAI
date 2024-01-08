package com.driveai.usersms.clients;

// Importing factories
import com.driveai.usersms.dto.DealershipDto;
import com.driveai.usersms.dto.UserDto;

// Importing FeignClient dependencies
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="vehicles-ms", url = "https://vehicles-ms-kubd27z4aq-uw.a.run.app/")
public interface VehiclesClient {
    // Get the other services endpoints
}