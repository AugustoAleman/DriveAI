package com.driveai.usersms.dto;


// returns dealership saleman name and dealership address
public class responseDtoDealership {
    private String name;
    private AddressDto address;

    public responseDtoDealership(String name, AddressDto address) {
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AddressDto getAddress() {
        return address;
    }

    public void setAddress(AddressDto address) {
        this.address = address;
    }
}
