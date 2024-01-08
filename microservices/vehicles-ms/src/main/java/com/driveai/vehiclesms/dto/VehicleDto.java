package com.driveai.vehiclesms.dto;

import com.driveai.vehiclesms.model.Image;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class VehicleDto {

    private Integer vehicleId;
    private Integer mileage;
    private Float performance;
    private String info;
    private String subBrand;
    private String brand;
    private String[] colors;
    private Integer model;
    private String version;
    private Integer seats;
    private String transmission;
    private Integer doors;
    private String fuel;
    private Integer airbags;
    private String traction;
    private Float price;
    private String dealershipName;
    private Integer dealershipId;
    private Integer salesManId;
    private FinancingPlanDto[] financingPlans;
    private boolean favorite;
    private AddressDto dealershipLocation;
    private List<Image> imageList;
    private String weaviate_id;
    private String img_url;

    public String getWeaviate_id() {
        return weaviate_id;
    }

    public void setWeaviate_id(String weaviate_id) {
        this.weaviate_id = weaviate_id;
    }

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public String getSubBrand() {
        return subBrand;
    }

    public void setSubBrand(String subBrand) {
        this.subBrand = subBrand;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String[] getColors() {
        return colors;
    }

    public void setColors(String[] colors) {
        this.colors = colors;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getDealershipName() {
        return dealershipName;
    }

    public void setDealershipName(String dealershipName) { this.dealershipName = dealershipName; }

    public Integer getDealershipId() { return dealershipId; }

    public void setDealershipId(Integer dealershipId) { this.dealershipId = dealershipId; }

    public Integer getSalesManId() { return salesManId; }

    public void setSalesManId(Integer salesManId) { this.salesManId = salesManId; }

    public Integer getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Integer vehicleId) {
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

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

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

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }

    public FinancingPlanDto[] getFinancingPlans() {
        return financingPlans;
    }

    public void setFinancingPlans(FinancingPlanDto[] financingPlans) {
        this.financingPlans = financingPlans;
    }

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

    public AddressDto getDealershipLocation() {
        return dealershipLocation;
    }

    public void setDealershipLocation(AddressDto dealershipLocation) {
        this.dealershipLocation = dealershipLocation;
    }

    public List<Image> getImageList() {
        return imageList;
    }

    public void setImageList(List<Image> imageList) {
        this.imageList = imageList;
    }
}
