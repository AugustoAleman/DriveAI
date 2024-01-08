package com.driveai.salesprocessms.dto.complexdto;

import java.math.BigDecimal;

public class CarPriceSumByYearDto {
    private Integer year;
    private BigDecimal carPriceSum;

    public CarPriceSumByYearDto(Integer year, BigDecimal carPriceSum) {
        this.year = year;
        this.carPriceSum = carPriceSum;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public BigDecimal getCarPriceSum() {
        return carPriceSum;
    }

    public void setCarPriceSum(BigDecimal carPriceSum) {
        this.carPriceSum = carPriceSum;
    }
}
