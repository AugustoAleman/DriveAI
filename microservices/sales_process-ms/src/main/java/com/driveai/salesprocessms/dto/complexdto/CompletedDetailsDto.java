package com.driveai.salesprocessms.dto.complexdto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CompletedDetailsDto {
    private LocalDateTime createdAt;
    private String orderStatus;
    private BigDecimal carPrice;

    public CompletedDetailsDto(LocalDateTime createdAt, String orderStatus, BigDecimal carPrice) {
        this.createdAt = createdAt;
        this.orderStatus = orderStatus;
        this.carPrice = carPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public BigDecimal getCarPrice() {
        return carPrice;
    }

    public void setCarPrice(BigDecimal carPrice) {
        this.carPrice = carPrice;
    }
}