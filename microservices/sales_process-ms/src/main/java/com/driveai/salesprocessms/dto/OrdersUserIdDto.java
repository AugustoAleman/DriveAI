package com.driveai.salesprocessms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersUserIdDto {
    private int userId;
    private String orderStatus;
}
