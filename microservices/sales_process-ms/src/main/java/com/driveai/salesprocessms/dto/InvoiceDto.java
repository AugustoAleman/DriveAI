package com.driveai.salesprocessms.dto;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDto {

    private int id;

    private int dealershipId;

    private int orderId;

    private int tradeInVehicleId;

    private int tokenStripeId;

    private int financingId;

    private int insuranceId;

    private String dateCreated;

    private String statuss;

    private BigDecimal carPrice;

    private int userId;

    private int sellerId;
    // additional fields for orderStatus and createdAt
    private String orderStatus;
    private String createdAt;
    private BigDecimal totalPayments;


}
