package com.driveai.salesprocessms.dto.complexdto;

public class OrderStatusVehicleIdAndUserIdDto {
    private String orderStatus;
    private int vehicleId;
    private int userId;

    public OrderStatusVehicleIdAndUserIdDto(String orderStatus, int vehicleId, int userId) {
        this.orderStatus = orderStatus;
        this.vehicleId = vehicleId;
        this.userId = userId;
    }

    // ... other getters and setters ...

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public int getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(int vehicleId) {
        this.vehicleId = vehicleId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}


