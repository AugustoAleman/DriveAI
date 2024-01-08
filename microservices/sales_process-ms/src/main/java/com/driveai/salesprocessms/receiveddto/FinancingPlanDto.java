package com.driveai.salesprocessms.receiveddto;

import lombok.Data;

@Data
public class FinancingPlanDto {
    Integer months;
    Double downPayment;
    Double interest;
    
}
