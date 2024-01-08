package com.driveai.vehiclesms.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;


public class AdminVehicleDto {

    private Integer vehicleId;
    private  Integer mileage;
    private Float performance;
    private String info;
    private String subBrand;
    private String brand;
    private List<String> colors;
    private Integer model;
    private String version;
    private Integer seats;
    private String transmission;
    private Integer doors;
    private String traction;
    private String fuel;
    private Integer airbags;
    private List<String> imageUrls;
    private Float price;
    private Integer managerId;
    private List<SalesmanDealershipDto> SalesmanDealership;
    private List<FinancingPlanDto> financingPlans;

    private String dealershipName;

    public Integer getAirbags() {
        return airbags;
    }

    public void setAirbags(Integer airbags) {
        this.airbags = airbags;
    }

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }
    private Integer selectedDealership;

    private Integer selectedSalesman;

    public Integer getSelectedDealership() {
        return selectedDealership;
    }

    public void setSelectedDealership(Integer selectedDealership) {
        this.selectedDealership = selectedDealership;
    }

    public Integer getVehicleId() { return vehicleId; }

    public void setVehicleId(Integer vehicleId) { this.vehicleId = vehicleId; }

    public Integer getMileage() { return mileage; }

    public Integer getSelectedSalesman() {
        return selectedSalesman;
    }

    public void setSelectedSalesman(Integer selectedSalesman) {
        this.selectedSalesman = selectedSalesman;
    }

    public void setMileage(Integer mileage) { this.mileage = mileage; }

    public Float getPerformance() { return performance; }

    public void setPerformance(Float performance) { this.performance = performance; }

    public String getInfo() { return info; }

    public void setInfo(String info) { this.info = info; }

    public String getSubBrand() { return subBrand; }

    public void setSubBrand(String subBrand) { this.subBrand = subBrand; }

    public String getBrand() { return brand; }

    public void setBrand(String brand) { this.brand = brand; }

    public List<String> getColors() { return colors; }

    public void setColors(List<String> colors) { this.colors = colors; }

    public Integer getModel() { return model; }

    public void setModel(Integer model) { this.model = model; }

    public String getVersion() { return version; }

    public void setVersion(String version) { this.version = version; }

    public Integer getSeats() { return seats; }

    public void setSeats(Integer seats) { this.seats = seats; }

    public String getTransmission() { return transmission; }

    public void setTransmission(String transmission) { this.transmission = transmission; }

    public Integer getDoors() { return doors; }

    public void setDoors(Integer doors) {this.doors = doors; }

    public String getTraction() { return traction; }

    public void setTraction(String traction) { this.traction = traction; }

    public Float getPrice() { return price; }

    public void setPrice(Float price) { this.price = price; }

    public Integer getManagerId() { return managerId; }

    public void setManagerId(Integer managerId) { this.managerId = managerId; }

    public List<SalesmanDealershipDto> getSalesmanDealership() { return SalesmanDealership; }

    public void setSalesmanDealership(List<SalesmanDealershipDto> salesmanDealership) { SalesmanDealership = salesmanDealership; }

    public List<FinancingPlanDto> getFinancingPlans() { return financingPlans; }

    public void setFinancingPlans(List<FinancingPlanDto> financingPlans) { this.financingPlans = financingPlans; }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getDealershipName() {
        return dealershipName;
    }

    public void setDealershipName(String dealershipName) {
        this.dealershipName = dealershipName;
    }
}
