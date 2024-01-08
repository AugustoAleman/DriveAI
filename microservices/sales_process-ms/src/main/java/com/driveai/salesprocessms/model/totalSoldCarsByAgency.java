package com.driveai.salesprocessms.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Immutable;
@Immutable
@Entity
@Table(name = "totalSoldCarsByAgency")

@SqlResultSetMapping(
        name = "totalSoldCarsByAgencyMapping",
        entities = @EntityResult(entityClass = totalSoldCarsByAgency.class)
)
@NamedNativeQuery(
        name = "agency_name",
        resultSetMapping = "totalSoldCarsByAgencyMapping",
        query = "SELECT agency_name,total_cars_sold  FROM totalSoldCarsByAgency WHERE agency_name = :nombreAgencia"
)
public class totalSoldCarsByAgency {
    @Id
    @Column(name = "agency_name", nullable = false)
    @Basic(optional = false)


    private String agency_name;
    private int total_cars_sold;
    public void setAgency_name(String agency_name) {
        this.agency_name = agency_name;
    }
    public int getTotal_cars_sold() {
        return total_cars_sold;
    }
    public String getAgency_name() {
        return agency_name;
    }
    public void setTotal_cars_sold(int total_cars_sold) {
        this.total_cars_sold = total_cars_sold;
    }







}
