package com.driveai.salesprocessms.dto.complexdto;

public class SelectedFieldsDto {
    private Integer dealershipId;
    private Integer userId;
    private Integer insuranceId;
    private Integer vehicleId;
    private Integer salesId; // new field

    public SelectedFieldsDto(Integer dealershipId, Integer userId, Integer insuranceId, Integer vehicleId, Integer salesId) {
        this.dealershipId = dealershipId;
        this.userId = userId;
        this.insuranceId = insuranceId;
        this.vehicleId = vehicleId;
        this.salesId = salesId; // set value
    }

    public Integer getDealershipId() {
        return dealershipId;
    }

    public void setDealershipId(Integer dealershipId) {
        this.dealershipId = dealershipId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(Integer insuranceId) {
        this.insuranceId = insuranceId;
    }

    public Integer getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Integer getSalesId() {
        return salesId;
    }

    public void setSalesId(Integer salesId) {
        this.salesId = salesId;
    }
}
