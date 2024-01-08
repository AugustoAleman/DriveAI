package com.driveai.vehiclesms.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

public class SalesmanDealershipDto {
    private Integer Id;
    private String name;
    private String surname;
    private Integer dealershipId;
    private String dealershipName;

    public Integer getId() { return Id; }

    public void setId(Integer id) { Id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getSurname() { return surname; }

    public void setSurname(String surname) { this.surname = surname; }

    public Integer getDealershipId() { return dealershipId; }

    public void setDealershipId(Integer dealershipId) { this.dealershipId = dealershipId; }

    public String getDealershipName() { return dealershipName; }

    public void setDealershipName(String dealershipName) { this.dealershipName = dealershipName; }
}
