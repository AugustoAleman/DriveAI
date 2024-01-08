package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
@Data
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;
    @Column(name = "date_payment", nullable = false)
    private BigDecimal datePayment;
    @Column(name = "dec_payment_amount", nullable = false)
    private BigDecimal decPaymentAmount;
    @Column(name = "str_payment_method", nullable = false)
    private String strPaymentMethod;


}
