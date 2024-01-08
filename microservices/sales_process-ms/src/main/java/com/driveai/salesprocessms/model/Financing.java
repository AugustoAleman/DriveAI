package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
@Data
@Entity
@Table(name = "financing")
public class Financing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private int id;
    private BigDecimal dec_amount_opening;
    private BigDecimal dec_monthly_payment;
    private BigDecimal dec_interest_rate;
    private BigDecimal dec_down_payment;


}
