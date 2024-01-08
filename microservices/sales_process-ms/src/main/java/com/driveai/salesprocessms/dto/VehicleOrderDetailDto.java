package com.driveai.salesprocessms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleOrderDetailDto {
    private int id;
    private int orderId;
    private int automotiveGroupId;
    private int vehicleId;
}
