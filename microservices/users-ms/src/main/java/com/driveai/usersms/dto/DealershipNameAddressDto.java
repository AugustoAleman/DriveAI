package com.driveai.usersms.dto;

import com.driveai.usersms.model.Dealership;

public class DealershipNameAddressDto {
    private String name;
    private String city;
    private String address;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public DealershipNameAddressDto() {

    }

    public DealershipNameAddressDto(Dealership d) {
        this.name = d.getName();
        this.city = d.getAddress().getCity();
        this.address = d.getAddress().getAddress();
    }
}
