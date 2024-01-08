package com.driveai.usersms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.util.Date;

@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id", nullable = false)
    private int id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    private Date updatedAt;
    @Nullable
    private Date deletedAt;
    @NotNull(message = "Name cannot be null/empty")
    private String state;
    @NotNull(message = "Name cannot be null/empty")
    private String city;
    @NotNull(message = "Name cannot be null/empty")
    private String address;
    @NotNull(message = "Name cannot be null/empty")
    @Size(min = 5, max = 5, message = "postal must be 5 digits")
    private String postal;

    private String no_appartment;
    @NotNull(message = "Name cannot be null/empty")
    @Column(name = "is_main", updatable = true)
    private boolean isMain;
    @NotNull(message = "Name cannot be null/empty")
    @PastOrPresent(message = "Date From cannot be in the future")
    private Date date_from;
    @JsonIgnore
    @Column(name = "longitude")
    @Nullable
    private String longitude;
    @JsonIgnore
    @Column(name = "latitude")
    @Nullable
    private String latitude;

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    private Date date_to;

    private boolean is_deleted;

    public boolean isIs_deleted() {
        return is_deleted;
    }

    public void setIs_deleted(boolean is_deleted) {
        this.is_deleted = is_deleted;
    }

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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostal() {
        return postal;
    }

    public void setPostal(String postal) {
        this.postal = postal;
    }

    public String getNo_appartment() {
        return no_appartment;
    }

    public void setNo_appartment(String no_appartment) {
        this.no_appartment = no_appartment;
    }

    public Boolean getIsMain() {
        return isMain;
    }

    public void setIsMain(Boolean isMain) {
        this.isMain = isMain;
    }

    public Date getDate_from() {
        return date_from;
    }

    public void setDate_from(Date date_from) {
        this.date_from = date_from;
    }

    public Date getDate_to() {
        return date_to;
    }

    public void setDate_to(Date date_to) {
        this.date_to = date_to;
    }

    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", userId=" + userId +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", deletedAt=" + deletedAt +
                ", state='" + state + '\'' +
                ", city='" + city + '\'' +
                ", address='" + address + '\'' +
                ", postal='" + postal + '\'' +
                ", no_appartment='" + no_appartment + '\'' +
                ", isMain=" + isMain +
                ", date_from=" + date_from +
                ", date_to=" + date_to +
                ", is_deleted=" + is_deleted +
                '}';
    }
}
