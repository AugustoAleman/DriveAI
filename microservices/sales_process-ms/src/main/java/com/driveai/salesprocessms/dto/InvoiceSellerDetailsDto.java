package com.driveai.salesprocessms.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceSellerDetailsDto {
    private int salesId; // Changed field name from 'id' to 'salesId'
    private String dateCreated;
    private int userId;
    private String orderStatus;
}

