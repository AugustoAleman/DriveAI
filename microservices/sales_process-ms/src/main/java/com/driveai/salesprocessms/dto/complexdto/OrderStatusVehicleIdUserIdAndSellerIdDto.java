package com.driveai.salesprocessms.dto.complexdto;

public class OrderStatusVehicleIdUserIdAndSellerIdDto {
    private String orderStatus;
    private int vehicleId;
    private int userId;
    private int sellerId;

    public OrderStatusVehicleIdUserIdAndSellerIdDto(String orderStatus, int vehicleId, int userId, int sellerId) {
        this.orderStatus = orderStatus;
        this.vehicleId = vehicleId;
        this.userId = userId;
        this.sellerId = sellerId;
    }

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

    public int getSellerId() {
        return sellerId;
    }

    public void setSellerId(int sellerId) {
        this.sellerId = sellerId;
    }
}
