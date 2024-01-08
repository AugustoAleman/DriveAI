package com.driveai.usersms.dto;

import com.driveai.usersms.model.Dealership;
import com.driveai.usersms.model.User;

public class SalesmanInfoDto {
    private int id;
    private String name;
    private String surname;
    private int dealershipId;
    private String dealershipName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getDealershipId() {
        return dealershipId;
    }

    public void setDealershipId(int dealershipId) {
        this.dealershipId = dealershipId;
    }

    public String getDealershipName() {
        return dealershipName;
    }

    public void setDealershipName(String dealershipName) {
        this.dealershipName = dealershipName;
    }

    public SalesmanInfoDto() {

    }

    public SalesmanInfoDto(Dealership d, User u) {
        this.dealershipId = d.getId();
        this.dealershipName = d.getName();
        this.id = u.getId();
        this.name = u.getName();
        this.surname = u.getSurname();
    }
}
