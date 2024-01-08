package com.driveai.salesprocessms.dto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DealershipBankAccountDto {
    @JsonIgnore
    private Integer id;

    private Long accountNumber;

    private String bank;

    private String interbankClabe;

    private Integer agencyId;

    private String modifiedDate;

    private String status;

}
