package com.driveai.salesprocessms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PriceAndDatesDto {
    private BigDecimal price;
    private LocalDate startDate;
    private LocalDate endDate;
}

