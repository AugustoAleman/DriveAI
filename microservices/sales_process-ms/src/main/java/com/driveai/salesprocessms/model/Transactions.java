package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "transactions")
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id", nullable = false)
    private int id;
    @Column(name = "date", nullable = false)
    private String date;
    @Column(name = "reference", nullable = false)
    private String reference;
    @Column(name = "dealership_id", nullable = false)
    private int dealershipId;
    @Column(name = "vehicle_id", nullable = false)
    private int vehicleId;
    @Column(name = "origin_account", nullable = false)
    private String originAccount;
    @Column(name = "type", nullable = false)
    private String type;
}
