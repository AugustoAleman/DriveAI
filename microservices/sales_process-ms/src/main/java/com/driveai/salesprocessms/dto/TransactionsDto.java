package com.driveai.salesprocessms.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionsDto {

    private int id;
    private String date;
    private String reference;
    private int dealershipId;
    private int vehicleId;
    private String originAccount;
    private String type;
}
