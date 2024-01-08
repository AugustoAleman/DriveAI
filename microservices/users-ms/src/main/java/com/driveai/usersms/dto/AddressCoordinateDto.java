package com.driveai.usersms.dto;

import com.driveai.usersms.model.Address;

import java.util.Date;

public class AddressCoordinateDto {

    private int id;

    private Integer userId;

    private Date createdAt;

    private Date updatedAt;

    private Date deletedAt;

    private String state;

    private String city;

    private String address;

    private String postal;

    private String no_appartment;

    private boolean isMain;

    private Date date_from;

    private Date date_to;

    private boolean is_deleted;

    private String longitude;

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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

    public boolean isMain() {
        return isMain;
    }

    public void setIsMain(boolean main) {
        isMain = main;
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

    public boolean isIs_deleted() {
        return is_deleted;
    }

    public void setIs_deleted(boolean is_deleted) {
        this.is_deleted = is_deleted;
    }

    public Address getAddressModel(){
        Address address = new Address();
        address.setAddress(this.address);
        address.setCity(this.city);
        address.setCreatedAt(this.createdAt);
        address.setDate_from(this.date_from);
        address.setDate_to(this.date_to);
        address.setDeletedAt(this.deletedAt);
        address.setId(this.id);
        address.setIs_deleted(this.is_deleted);
        address.setIsMain(this.isMain);
        address.setNo_appartment(this.no_appartment);
        address.setPostal(this.postal);
        address.setState(this.state);
        address.setUpdatedAt(this.updatedAt);
        address.setUserId(this.userId);
        address.setLatitude(this.latitude);
        address.setLongitude(this.longitude);
        return address;
    }

    public AddressCoordinateDto (Address address) {
        this.address = address.getAddress();
        this.city = address.getCity();
        this.createdAt = address.getCreatedAt();
        this.date_from = address.getDate_from();
        this.date_to = address.getDate_to();
        this.deletedAt = address.getDeletedAt();
        this.id = address.getId();
        this.is_deleted = address.isIs_deleted();
        this.isMain = address.getIsMain();
        this.no_appartment = address.getNo_appartment();
        this.postal = address.getPostal();
        this.state = address.getState();
        this.updatedAt = address.getUpdatedAt();
        this.userId = address.getUserId();
        this.latitude = address.getLatitude();
        this.longitude = address.getLongitude();
    }

    public AddressCoordinateDto() {
    }
}
