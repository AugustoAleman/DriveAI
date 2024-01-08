package com.driveai.salesprocessms.dto;

import com.driveai.salesprocessms.model.TradeInVehicle;
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
public class TradeInVehicleDto {
    private int id;

    private int year;

    private String brand;

    private String carModel;

    private BigDecimal version;


    private String color;


    private int kilometers;

    private BigDecimal price;
}
