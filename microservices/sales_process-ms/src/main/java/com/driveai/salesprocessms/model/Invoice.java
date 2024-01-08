package com.driveai.salesprocessms.model;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "invoice")
public class Invoice {
    @Transient
    private String orderStatus;
    public Invoice(int id, BigDecimal carPrice, String orderStatus) {
        this.id = id;
        this.carPrice = carPrice;
        this.orderStatus = orderStatus;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id", nullable = false)
    private int id;
    @Column(name = "dealership_id", nullable = false)
    private int dealershipId;
    @ManyToOne
    @JoinColumn(name = "orderr_id", nullable = false)
    private Orderr orderr;
    @Column(name = "trade_in_vehicle_id", nullable = false)
    private int tradeInVehicleId;
    @Column(name = "token_stripe_id", nullable = false)
    private int tokenStripeId;
    @Column(name = "financing_id", nullable = false)
    private int financingId;

    @Column(name = "insurance_id", nullable = false)
    private int insuranceId;
    @Column(name = "date_created", nullable = false)
    private String dateCreated;
    @Column(name = "statuss", nullable = false)
    private String statuss;
    @Column(name = "car_price", nullable = false)
    private BigDecimal carPrice;
    @Column(name = "user_id", nullable = false)
    private int userId;
    @Column(name = "seller_id", nullable = false)
    private int sellerId;
    @OneToMany(mappedBy = "invoice")
    private List<Payment> payments;


}
