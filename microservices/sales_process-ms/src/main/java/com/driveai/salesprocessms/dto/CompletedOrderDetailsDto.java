package com.driveai.salesprocessms.dto;

import com.driveai.salesprocessms.receiveddto.BasicInfoDto;
import com.driveai.salesprocessms.receiveddto.DealershipNameAddressDto;
import com.driveai.salesprocessms.receiveddto.NameDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompletedOrderDetailsDto {
    private String orderStatus;
    private int vehicleId;
    private int dealershipId;
    private int sellerId;
    private LocalDateTime createdAt;


}

