package com.driveai.salesprocessms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
@Data
@Entity
@Table(name = "subscription")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @JsonIgnore
    private int id;
    @JsonIgnore
    @Column(name = "user_id", nullable = false)
    private int userId;
    @Column(name = "plan_type", nullable = false)
    private String planType;
    @Column(name = "price", nullable = false)
    private  String price;

}
