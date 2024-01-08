package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "automotive_group_subscription")
public class AutomotiveGroupSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "automotive_group_id", nullable = false)
    private int automotiveGroupId;
    @Column(name = "plan_type", nullable = false)
    private String planType;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

}
