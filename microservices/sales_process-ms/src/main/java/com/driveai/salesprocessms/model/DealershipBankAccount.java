package com.driveai.salesprocessms.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity
@Table(name = "dealership_bank_account")
public class DealershipBankAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "account_number", nullable = false)
    private Long accountNumber;
    @Column(name = "bank", nullable = false)
    private String bank;
    @Column(name = "interbank_clabe", nullable = false)
    private String interbankClabe;
    @Column(name = "agency_id", nullable = false)
    private Integer agencyId;
    @Column(name = "modified_date", nullable = false)
    private String modifiedDate;

    @Column(name = "statuss", nullable = false)
    private String status;
}
