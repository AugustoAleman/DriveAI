package com.driveai.salesprocessms.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class InvoiceSearchDto {
    private int id;
    private BigDecimal carPrice;
    private String orderStatus;
    private String createdAt;
}
