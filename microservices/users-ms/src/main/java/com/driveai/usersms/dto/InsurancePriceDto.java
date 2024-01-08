package com.driveai.usersms.dto;

public class InsurancePriceDto {
    private double price;

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public InsurancePriceDto() {
    }

    public InsurancePriceDto(double price) {
        this.price = price;
    }
}
