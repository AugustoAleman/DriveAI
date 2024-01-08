package com.driveai.salesprocessms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsDto {
    private int orderId;
    private int sellerId;
    private int userId;
    private LocalDateTime createdAt;
    private String orderStatus;


}
