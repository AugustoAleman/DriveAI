package com.driveai.vehiclesms.dto;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DrivingTestCardDto {
    private int drivingTestId;
    private String vehicleName;
    private String vehicleImage;
    private Float price;
    private String day;
    private String hour;
    private Integer salesmanId;
    private String salesmanName;
    private String address;
    private String Status;

    public int getDrivingTestId() {
        return drivingTestId;
    }

    public void setDrivingTestId(int drivingTestId) {
        this.drivingTestId = drivingTestId;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getVehicleImage() {
        return vehicleImage;
    }

    public void setVehicleImage(String vehicleImage) {
        this.vehicleImage = vehicleImage;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public void setDayAndHour(Date date){
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm aa");

        String dateString = dateFormat.format(date);
        String timeString = timeFormat.format(date);

        this.day = dateString;
        this.hour = timeString;
    }

    public String getSalesmanName() {
        return salesmanName;
    }

    public void setSalesmanName(String salesmanName) {
        this.salesmanName = salesmanName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public Integer getSalesmanId() {
        return salesmanId;
    }

    public void setSalesmanId(Integer salesmanId) {
        this.salesmanId = salesmanId;
    }
}
