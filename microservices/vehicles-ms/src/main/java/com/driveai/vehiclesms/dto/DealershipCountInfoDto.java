package com.driveai.vehiclesms.dto;

import com.driveai.vehiclesms.model.DealershipVehicle;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DealershipCountInfoDto {
    private Integer dealerShipId;
    private Integer amountLoadedVehicles;
    private List<DealershipVehicle> dealershipVehicle;

    public Integer getDealerShipId() {
        return dealerShipId;
    }

    public void setDealerShipId(Integer dealerShipId) {
        this.dealerShipId = dealerShipId;
    }

    public Integer getAmountLoadedVehicles() {
        return amountLoadedVehicles;
    }

    public void setAmountLoadedVehicles(Integer amountLoadedVehicles) {
        this.amountLoadedVehicles = amountLoadedVehicles;
    }

    public List<DealershipVehicle> getDealershipVehicle() {
        return dealershipVehicle;
    }

    public void setDealershipVehicle(List<DealershipVehicle> dealershipVehicle) {
        this.dealershipVehicle = dealershipVehicle;
    }
}
