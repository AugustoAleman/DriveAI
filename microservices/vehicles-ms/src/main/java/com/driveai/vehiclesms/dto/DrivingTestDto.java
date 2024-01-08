package com.driveai.vehiclesms.dto;

import com.driveai.vehiclesms.model.Vehicle;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

public class    DrivingTestDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer drivingTestId;
    private Integer userId;
    private Integer dealershipVehicleId;
    private Date schedule;
    private Date tentativeBuyingDate;
    private String status;
    private Date deletedAt;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private Date createdAt;
    private Date updatedAt;
    @Column(name = "deleted", columnDefinition = "TINYINT DEFAULT 0")
    private boolean deleted;

    public Integer getDrivingTestId() {
        return drivingTestId;
    }

    public void setDrivingTestId(Integer drivingTestId) {
        this.drivingTestId = drivingTestId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getDealershipVehicleId() {
        return dealershipVehicleId;
    }

    public void setDealershipVehicleId(Integer dealershipVehicleId) {
        this.dealershipVehicleId = dealershipVehicleId;
    }

    public Date getSchedule() {
        return schedule;
    }

    public void setSchedule(Date schedule) {
        this.schedule = schedule;
    }

    public Date getTentativeBuyingDate() {
        return tentativeBuyingDate;
    }

    public void setTentativeBuyingDate(Date tentativeBuyingDate) {
        this.tentativeBuyingDate = tentativeBuyingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
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

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
