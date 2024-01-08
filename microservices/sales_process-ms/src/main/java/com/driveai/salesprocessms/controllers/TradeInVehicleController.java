package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.dto.FinancingDto;
import com.driveai.salesprocessms.dto.TradeInVehicleDto;
import com.driveai.salesprocessms.model.Financing;
import com.driveai.salesprocessms.model.TradeInVehicle;
import com.driveai.salesprocessms.service.TradeInVehicleService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/sales-process/trade-in-vehicle")
@Hidden
public class TradeInVehicleController {

    @Autowired
    private TradeInVehicleService tradeInVehicleService;
    @Operation(summary = "Endpoint that search per brand for trade in vehicle")

    @GetMapping("/trade-in-vehicles/brand/{brand}")
    public List<TradeInVehicleDto> findByBrand(@PathVariable String brand) {
        return tradeInVehicleService.findByBrand(brand);
    }

    @Operation(summary = "Endpoint that displays all trade in vehicle information")

    @GetMapping("/trade-in-vehicles")
    public List<TradeInVehicleDto> findAll() {
        return tradeInVehicleService.findAll();
    }

}
