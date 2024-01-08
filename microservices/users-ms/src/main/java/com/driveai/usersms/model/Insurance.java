package com.driveai.usersms.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.ws.rs.DefaultValue;

import java.util.Date;
import java.util.List;

@Entity
public class Insurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    @Column(name = "updated_at")
    private Date updatedAt;
    @Nullable
    private Date deletedAt;
    @Column(name = "is_deleted", nullable = false)
    @DefaultValue("false")
    private boolean isDeleted;
    @Column(name = "name", nullable = false)
    @NotEmpty
    private String name;
    @Column(name = "description", nullable = false)
    @NotEmpty
    private String description;
    @Column(name = "price", nullable = false)
    @PositiveOrZero
    private double price;
    @Column(name = "date_from", nullable = false)
    private Date dateFrom;
    @Column(name = "date_to", nullable = false)
    private Date dateTo;
    @ManyToMany
    @JoinTable(
            name = "dealership_insurance",
            joinColumns = @JoinColumn(name = "insurance_id"),
            inverseJoinColumns = @JoinColumn(name = "dealership_id")
    )
    private List<Dealership> dealerships;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<Dealership> getDealerships() {
        return dealerships;
    }

    public void setDealerships(List<Dealership> dealerships) {
        this.dealerships = dealerships;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Date dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }

    public void setDateTo(Date dateTo) {
        this.dateTo = dateTo;
    }
}
