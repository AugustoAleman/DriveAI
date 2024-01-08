package com.driveai.vehiclesms.dto;

public class SalesmanInformationDto {

    private String name;
    private AddressSmallDto address;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AddressSmallDto getAddress() {
        return address;
    }

    public void setAddress(AddressSmallDto address) {
        this.address = address;
    }
}

