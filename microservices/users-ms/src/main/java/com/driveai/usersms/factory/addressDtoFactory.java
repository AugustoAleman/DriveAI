package com.driveai.usersms.factory;

import com.driveai.usersms.dto.AddressDto;
import org.springframework.stereotype.Component;

@Component
public class addressDtoFactory {

    public static AddressDto createAddressDto(String street, String city, String state, String zipCode, Integer addressId) {
        AddressDto addressDto = new AddressDto();
        addressDto.setAddress(street);
        addressDto.setCity(city);
        addressDto.setState(state);
        addressDto.setPostal(zipCode);
        addressDto.setId(addressId);
        return addressDto;
    }
}
