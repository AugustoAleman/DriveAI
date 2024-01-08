package com.driveai.salesprocessms.dto;

import com.driveai.salesprocessms.model.totalSoldCarsByAgency;
import lombok.Data;

@Data
public class totalSoldCarsByAgencyDto {


    private String agency_name;

    private int total_cars_sold;




    public totalSoldCarsByAgencyDto(totalSoldCarsByAgency traInTableDto) {

        this.agency_name= traInTableDto.getAgency_name();
        this.total_cars_sold= traInTableDto.getTotal_cars_sold();


    }
}
