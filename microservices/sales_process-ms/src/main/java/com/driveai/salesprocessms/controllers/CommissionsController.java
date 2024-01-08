package com.driveai.salesprocessms.controllers;

import com.driveai.salesprocessms.dto.CommissionsDto;
import com.driveai.salesprocessms.model.Commissions;
import com.driveai.salesprocessms.service.CommissionsService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.PublicKey;

@RestController
@RequestMapping("/v1/sales-process/commissions")
public class CommissionsController {
    @Autowired
    private CommissionsService commissionsService;
    @Operation(summary = "Endpoint modifies the register commission")
    @PutMapping("/registerCommission")
    public ResponseEntity<?> updateRegisterCommission(@RequestBody BigDecimal registerCommission) {
        commissionsService.updateRegisterCommission(registerCommission);
        return ResponseEntity.ok().body("{\"message\": \"Register commission updated successfully\"}");
    }

    @Operation(summary = "Endpoint modifies the sales commission")
    @PutMapping("/saleCommission")
    public ResponseEntity<?> updateSaleCommission(@RequestBody BigDecimal saleCommission) {
        commissionsService.updateSaleCommission(saleCommission);
        return ResponseEntity.ok().body("{\"message\": \"Sale commission updated successfully\"}");
    }
    @Operation(summary = "Endpoint that modifies the free subscription price")
    @PutMapping("/subscriptionPriceFree")
    public ResponseEntity<?> updateSubscriptionPriceFree(@RequestBody BigDecimal subscriptionPriceFree) {
        commissionsService.updateSubscriptionPriceFree(subscriptionPriceFree);
        return ResponseEntity.ok().body("{\"message\": \"Free subscription price updated succesfully\"}");
    }
    @Operation(summary = "Endpoint that modifies the Plus subscription price")
    @PutMapping("/subscriptionPricePlus")
    public ResponseEntity<?> updateSubscriptionPricePlus(@RequestBody BigDecimal subscriptionPricePlus) {
        commissionsService.updateSubscriptionPricePlus(subscriptionPricePlus);
        return ResponseEntity.ok().body("{\"message\": \"Plus subscription price updated succesfully\"}");
    }
    @Operation(summary = "Endpoint that modifies the Pro subscription price")
    @PutMapping("/subscriptionPricePro")
    public ResponseEntity<?> updateSubscriptionPricePro(@RequestBody BigDecimal subscriptionPricePro) {
        commissionsService.updateSubscriptionPricePro(subscriptionPricePro);
        return ResponseEntity.ok().body("{\"message\": \"Pro subscription price updated succesfully\"}");
    }
    @Operation(summary = "Endpoint that modifies the Enterprise subscription price")
    @PutMapping("/subscriptionPriceEnterprise")
    public ResponseEntity<?> updateSubscriptionPriceEnterprise(@RequestBody BigDecimal subscriptionPriceEnterprise) {
        commissionsService.updateSubscriptionPriceEnterprise(subscriptionPriceEnterprise);
        return ResponseEntity.ok().body("{\"message\": \"Enterprise subscription price updated succesfully\"}");
    }
    @Operation(summary = "Endpoint that modifies per sold car commission")
    @PutMapping("/car-commission")
    public ResponseEntity<?> updateCarComissionPrice(@RequestBody BigDecimal carCommission){
        commissionsService.updateCarComissionPrice(carCommission);
        return ResponseEntity.ok().body("{\"message\": \"Car commission price updated succesfully\"}");
    }
    @Operation(summary = "Endpoint that requests all data that involves commissions")
    @GetMapping("/requestAllData")
    public ResponseEntity<Commissions> getCommissions() {
        Commissions commissions = commissionsService.getCommissions();
        return ResponseEntity.ok(commissions);
    }
    @Operation(summary = "Endpoint that allows admin to modify all prices at once.")
    @PutMapping("/updateAll")
    public ResponseEntity<?> updateAll(@RequestBody CommissionsDto commissionsDto) {
        commissionsService.updateRegisterCommission(commissionsDto.getRegisterCommission());
        commissionsService.updateSaleCommission(commissionsDto.getSaleCommission());
        commissionsService.updateSubscriptionPriceFree(commissionsDto.getSubscriptionPriceFree());
        commissionsService.updateSubscriptionPricePlus(commissionsDto.getSubscriptionPricePlus());
        commissionsService.updateSubscriptionPricePro(commissionsDto.getSubscriptionPricePro());
        commissionsService.updateSubscriptionPriceEnterprise(commissionsDto.getSubscriptionPriceEnterprise());
        commissionsService.updateCarComissionPrice(commissionsDto.getCarCommission());
        return ResponseEntity.ok().body("{\"message\": \"All fields updated successfully\"}");
    }



}
