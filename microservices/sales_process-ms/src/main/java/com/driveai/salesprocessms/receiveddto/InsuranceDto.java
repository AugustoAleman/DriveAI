package com.driveai.salesprocessms.receiveddto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Date;
@Data
public class InsuranceDto {
    @JsonIgnore
    private int id;

    private String name;
    @JsonIgnore
    private String description;
    @JsonIgnore
    private double price;
    @JsonIgnore
    private Date dateFrom;
    @JsonIgnore
    private Date dateTo;

}

