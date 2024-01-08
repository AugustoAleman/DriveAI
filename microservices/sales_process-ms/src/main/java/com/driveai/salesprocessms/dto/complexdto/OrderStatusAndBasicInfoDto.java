package com.driveai.salesprocessms.dto.complexdto;

import com.driveai.salesprocessms.receiveddto.BasicInfoDto;
import com.driveai.salesprocessms.receiveddto.DrivingTestCardDto;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

public class OrderStatusAndBasicInfoDto {
    private String orderStatus;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private BasicInfoDto vehicle;
    private Object userName;
    private List<DrivingTestStatusDto> DrivingTestStatus;

    public OrderStatusAndBasicInfoDto(String orderStatus, BasicInfoDto vehicle, Object userName, List<DrivingTestStatusDto> drivingTestStatus) {
        this.orderStatus = orderStatus;
        this.vehicle = vehicle;
        this.userName = userName;
        this.DrivingTestStatus = drivingTestStatus;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public BasicInfoDto getVehicle() {
        return vehicle;
    }

    public void setVehicle(BasicInfoDto vehicle) {
        this.vehicle = vehicle;
    }

    public Object getUserName() {
        return userName;
    }

    public void setUserName(Object userName) {
        this.userName = userName;
    }

    public List<DrivingTestStatusDto> getDrivingTestStatus() {
        return DrivingTestStatus;
    }

    public void setDrivingTestStatus(List<DrivingTestStatusDto> drivingTestStatus) {
        DrivingTestStatus = drivingTestStatus;
    }
}


