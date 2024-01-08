package com.driveai.salesprocessms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "commissions")
public class Commissions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @JsonIgnore
    private int id;
    @Column(name = "register_commission",nullable = false)
    private BigDecimal registerCommission;
    @Column(name = "sale_commission",nullable = false)
    private BigDecimal saleCommission;
    @Column(name = "subscription_price_free",nullable = false)
    private BigDecimal subscriptionPriceFree;
    @Column(name = "subscription_price_plus", nullable = false)
    private BigDecimal subscriptionPricePlus;
    @Column(name = "subscription_price_pro", nullable = false)
    private BigDecimal subscriptionPricePro;
    @Column(name = "subscription_price_enterprise", nullable = false)
    private BigDecimal subscriptionPriceEnterprise;

    @Column(name = "car_commission",nullable = false)
    private BigDecimal carCommission;

}
