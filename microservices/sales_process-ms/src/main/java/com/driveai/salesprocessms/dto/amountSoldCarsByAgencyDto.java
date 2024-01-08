package com.driveai.salesprocessms.dto;

import com.driveai.salesprocessms.model.amountSoldCarsByAgency;

public class amountSoldCarsByAgencyDto {


    private String agency_name;

    private int amount_cars_sold;

    public String getAgencyName() {
        return agency_name;
    }

    public void setAgencyName(String agencyName) {
        this.agency_name = agencyName;
    }

    public int getTotalCarsSold() {
        return amount_cars_sold;
    }

    public void setTotalCarsSold(int totalCarsSold) {
        this.amount_cars_sold = totalCarsSold;
    }



    public amountSoldCarsByAgencyDto(amountSoldCarsByAgency traInTableDto) {

        this.agency_name= traInTableDto.getAgency_name();
        this.amount_cars_sold= traInTableDto.getTotal_cars_sold();
    }
}
