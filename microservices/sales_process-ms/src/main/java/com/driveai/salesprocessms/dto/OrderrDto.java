package com.driveai.salesprocessms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderrDto {

    private int id;

    private int userId;

    private String orderStatus;

    private LocalDateTime createdAt;
}
