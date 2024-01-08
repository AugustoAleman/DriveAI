package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "commissions_log")
public class CommissionsLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "commissions_id", nullable = false)
    private Commissions commissions;

    @Column(name = "register_commission")
    private BigDecimal registerCommission;

    @Column(name = "sale_commission")
    private BigDecimal saleCommission;

    @Column(name = "subscription_price_free")
    private BigDecimal subscriptionPriceFree;

    @Column(name = "subscription_price_plus")
    private BigDecimal subscriptionPricePlus;

    @Column(name = "subscription_price_pro")
    private BigDecimal subscriptionPricePro;

    @Column(name = "subscription_price_enterprise")
    private BigDecimal subscriptionPriceEnterprise;

    @Column(name = "car_commission")
    private BigDecimal carCommission;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;
}
