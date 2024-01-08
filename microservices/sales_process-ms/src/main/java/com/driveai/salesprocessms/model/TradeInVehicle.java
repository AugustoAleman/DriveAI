package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
@Data
@Entity
@Table(name = "trade_in_vehicle")
public class TradeInVehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "num_year", nullable = false)
    private int year;
    @Column(name = "str_brand", nullable = false)
    private String brand;
    @Column(name = "str_car_model", nullable = false)
    private String carModel;
    @Column(name = "dec_version", nullable = false)
    private BigDecimal version;
    @Column(name = "str_color", nullable = false)

    private String color;
    @Column(name = "num_kilometers", nullable = false)

    private int kilometers;
    @Column(name = "dec_price", nullable = false)
    private BigDecimal price;

}
