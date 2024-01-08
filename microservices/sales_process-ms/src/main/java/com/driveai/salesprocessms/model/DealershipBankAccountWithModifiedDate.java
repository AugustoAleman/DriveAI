package com.driveai.salesprocessms.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "dealership_bank_account")
public class DealershipBankAccountWithModifiedDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @JsonIgnore
    private Integer id;
    @Column(name = "account_number", nullable = false)
    private Long accountNumber;
    @Column(name = "bank", nullable = false)
    private String bank;
    @Column(name = "interbank_clabe", nullable = false)
    private String interbankClabe;
    @Column(name = "agency_id", nullable = false)
    private Integer agencyId;

    @Column(name = "statuss", nullable = false)
    private String status;
}
