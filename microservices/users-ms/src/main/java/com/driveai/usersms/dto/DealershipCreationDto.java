package com.driveai.usersms.dto;

import com.driveai.usersms.model.Address;
import com.driveai.usersms.model.Dealership;
import com.driveai.usersms.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DealershipCreationDto {

    private int id;

    private Date createdAt;

    private Date updatedAt;

    private Date deletedAt;

    private String name;

    private boolean isDeleted;

    private List<User> users = new ArrayList<>();

    private AddressCoordinateDto address;

    private int automotiveGroupId;

    public int getAutomotiveGroupId() {
        return automotiveGroupId;
    }

    public void setAutomotiveGroupId(int automotiveGroupId) {
        this.automotiveGroupId = automotiveGroupId;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public AddressCoordinateDto getAddress() {
        return address;
    }

    public void setAddress(AddressCoordinateDto address) {
        this.address = address;
    }

    public boolean isDeleted() {
        return isDeleted;
    }
    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public int getId() { return id; }
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

    public Dealership getDealership() {
        Dealership dealership = new Dealership();
        dealership.setId(this.id);
        dealership.setCreatedAt(this.createdAt);
        dealership.setUpdatedAt(this.updatedAt);
        dealership.setDeletedAt(this.deletedAt);
        dealership.setName(this.name);
        dealership.setDeleted(this.isDeleted);
        dealership.setUsers(this.users);
        dealership.setAddress(this.address.getAddressModel());
        dealership.setAutomotiveGroupId(this.automotiveGroupId);
        return dealership;
    }
}
