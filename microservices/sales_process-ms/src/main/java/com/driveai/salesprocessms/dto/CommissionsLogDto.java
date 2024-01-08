package com.driveai.salesprocessms.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommissionsLogDto {
@JsonIgnore
    private int id;

@JsonIgnore
    private int commissionsId;


    private BigDecimal registerCommission;


    private BigDecimal saleCommission;


    private BigDecimal subscriptionPriceFree;


    private BigDecimal subscriptionPricePlus;


    private BigDecimal subscriptionPricePro;

    private BigDecimal subscriptionPriceEnterprise;
    private BigDecimal carCommission;
    private LocalDateTime timestamp;
}
