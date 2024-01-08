package com.driveai.vehiclesms.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int vehicleId;
    private Integer mileage;
    private Float performance;
    private String info;
    @ManyToOne
    @JoinColumn(name = "sub_brand_id")
    private SubBrand subBrand;
    @OneToMany(mappedBy = "vehicle")
    @JsonIgnore
    private List<DealershipVehicle> dealershipVehicles;
    private Integer model;
    private String version;
    private Integer seats;
    private String transmission;
    private Integer doors;
    private String fuel;
    private Integer airbags;
    private String traction;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Date createdAt;
    private Date updatedAt;
    @Column(name = "deleted", columnDefinition = "TINYINT DEFAULT 0")
    private boolean deleted;
    private Date deletedAt;

    public int getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(int vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public Float getPerformance() {
        return performance;
    }

    public void setPerformance(Float performance) {
        this.performance = performance;
    }
    public SubBrand getSubBrand() {
        return subBrand;
    }

    public void setSubBrand(SubBrand subBrand) {
        this.subBrand = subBrand;
    }
    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Integer getModel() {
        return model;
    }

    public void setModel(Integer model) {
        this.model = model;
    }

    public  String getVersion() {return version; }

    public void setVersion(String version) { this.version = version; }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public Integer getDoors() {
        return doors;
    }

    public void setDoors(Integer doors) {
        this.doors = doors;
    }

    public String getFuel() { return fuel; }

    public void setFuel(String fuel) { this.fuel = fuel; }

    public Integer getAirbags() {
        return airbags;
    }

    public void setAirbags(Integer airbags) {
        this.airbags = airbags;
    }

    public String getTraction() {
        return traction;
    }

    public void setTraction(String traction) {
        this.traction = traction;
    }

    public boolean isDeleted() {
        return deleted;
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

    public boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public List<DealershipVehicle> getDealershipVehicles() {
        return dealershipVehicles;
    }

    public void setDealershipVehicles(List<DealershipVehicle> dealershipVehicles) {
        this.dealershipVehicles = dealershipVehicles;
    }
}