package com.driveai.vehiclesms.factory;

import com.driveai.vehiclesms.dto.VehicleDto;
import com.driveai.vehiclesms.model.SubBrand;

public class SubBrandFactory {
    public SubBrand updateSubBrandFromVehicleDto(VehicleDto vehicleDto, SubBrand subBrand){
        subBrand.setBrand(vehicleDto.getBrand());
        subBrand.setSubBrand(vehicleDto.getSubBrand());
        return subBrand;
    }
}
