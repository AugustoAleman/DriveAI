package com.driveai.salesprocessms.dto.complexdto;

import com.driveai.salesprocessms.receiveddto.NameDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceUserDetailsDto {
    private int salesId;
    private int sellerId;
    private LocalDateTime dateCreated;
    private String orderStatus;
    private NameDto userInfo;



    // getters and setters
}
