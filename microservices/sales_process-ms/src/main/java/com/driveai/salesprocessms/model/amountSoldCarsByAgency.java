package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Immutable;

@Immutable
@Entity

@Table(name = "amountSoldCarsByAgency")

@SqlResultSetMapping(
        name = "amountSoldCarsByAgencyMappingg",
        entities = @EntityResult(entityClass = amountSoldCarsByAgency.class)
)
@NamedNativeQuery(
        name = "agency_namee",
        resultSetMapping = "amountSoldCarsByAgencyMappingg",
        query = "SELECT agency_name,amount_cars_sold  FROM amountSoldCarsByAgency WHERE agency_name = :nombreAgencia"
)
public class amountSoldCarsByAgency {
    @Id
    @Column(name = "agency_name", nullable = false)
    @Basic(optional = false)


    private String agency_name;
    private int amount_cars_sold;
    public void setAgency_name(String agency_name) {
        this.agency_name = agency_name;
    }
    public int getTotal_cars_sold() {
        return amount_cars_sold;
    }
    public String getAgency_name() {
        return agency_name;
    }
    public void setTotal_cars_sold(int total_cars_sold) {
        this.amount_cars_sold = total_cars_sold;
    }







}
