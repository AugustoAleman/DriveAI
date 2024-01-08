package com.driveai.salesprocessms.dto;

import com.driveai.salesprocessms.model.Invoice;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    private int id;

    private int invoiceId;

    private BigDecimal datePayment;

    private BigDecimal decPaymentAmount;

    private String strPaymentMethod;
}
