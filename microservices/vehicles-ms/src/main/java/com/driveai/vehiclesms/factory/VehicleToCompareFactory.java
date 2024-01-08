package com.driveai.vehiclesms.factory;

import com.driveai.vehiclesms.dto.VehiclesToCompareDto;
import com.driveai.vehiclesms.model.DealershipVehicle;
import com.driveai.vehiclesms.model.FinancingPlan;

import java.util.List;

public class VehicleToCompareFactory {

    public VehiclesToCompareDto setValueToVehicleDto(DealershipVehicle dealershipVehicle, FinancingPlan financingPlan){
        VehiclesToCompareDto newVehicle = new VehiclesToCompareDto();

        newVehicle.setSubBrand(dealershipVehicle.getVehicle().getSubBrand().getSubBrand());
        newVehicle.setBrand(dealershipVehicle.getVehicle().getSubBrand().getSubBrand());
        newVehicle.setDealershipName(dealershipVehicle.getDealershipName());
        newVehicle.setModel(dealershipVehicle.getVehicle().getModel());
        newVehicle.setVersion(dealershipVehicle.getVehicle().getVersion());
        newVehicle.setPrice(dealershipVehicle.getPrice().doubleValue());
        newVehicle.setTransmission(dealershipVehicle.getVehicle().getTransmission());
        newVehicle.setMileage(dealershipVehicle.getVehicle().getMileage());
        newVehicle.setFuel(dealershipVehicle.getVehicle().getFuel());
        newVehicle.setTraction(dealershipVehicle.getVehicle().getTraction());
        newVehicle.setDealershipVehicleId(dealershipVehicle.getDealershipVehicleId());
        newVehicle.setDownPayment(dealershipVehicle.getPrice()*financingPlan.getDownPayment());
        newVehicle.setColors(dealershipVehicle.getColors());
        newVehicle.setImage_url(dealershipVehicle.getImg_url());
        newVehicle.setDealershipId(dealershipVehicle.getDealershipId());

        return newVehicle;

    }




}
