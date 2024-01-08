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
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommissionsDto {
@JsonIgnore
    private int id;

    private BigDecimal registerCommission;

    private BigDecimal saleCommission;

    private BigDecimal subscriptionPriceFree;

    private BigDecimal subscriptionPricePlus;

    private BigDecimal subscriptionPricePro;

    private BigDecimal subscriptionPriceEnterprise;
    private BigDecimal carCommission;
}
