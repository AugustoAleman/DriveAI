package com.driveai.salesprocessms.dto;

import com.driveai.salesprocessms.model.Financing;
import lombok.Data;

import java.math.BigDecimal;
@Data
public class FinancingDto {
    private int id;
    private BigDecimal dec_amount_opening;
    private BigDecimal dec_monthly_payment;
    private BigDecimal dec_interest_rate;
    private BigDecimal dec_down_payment;



    public FinancingDto(Financing financing) {
        this.id = financing.getId();
        this.dec_amount_opening = financing.getDec_amount_opening();
        this.dec_monthly_payment = financing.getDec_monthly_payment();
        this.dec_interest_rate = financing.getDec_interest_rate();
        this.dec_down_payment = financing.getDec_down_payment();
    }
}
