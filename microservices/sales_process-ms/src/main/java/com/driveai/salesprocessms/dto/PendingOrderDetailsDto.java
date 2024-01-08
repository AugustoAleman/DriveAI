package com.driveai.salesprocessms.dto;

import com.driveai.salesprocessms.receiveddto.BasicInfoDto;
import com.driveai.salesprocessms.receiveddto.NameDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PendingOrderDetailsDto {
    private String orderStatus;
    private int vehicleId;
    private int dealershipId;
    private int sellerId;


}

