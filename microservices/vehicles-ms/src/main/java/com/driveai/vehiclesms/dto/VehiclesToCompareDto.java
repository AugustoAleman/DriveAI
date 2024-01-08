package com.driveai.vehiclesms.dto;

import com.driveai.vehiclesms.model.Color;

import java.util.List;

public class VehiclesToCompareDto { private Integer dealershipId;
    private Integer dealershipVehicleId;
    private String subBrand;
    private String Brand;
    private String dealershipName;
    private Double price;
    private Integer model;
    private String version;
    private String fuel;
    private String transmission;
    private Integer mileage;
    private String traction;
    private Double downPayment;
    private String image_url;

    private List<Color> colors;

    public Integer getDealershipVehicleId() { return dealershipVehicleId; }

    public void setDealershipVehicleId(Integer dealershipVehicleId) { this.dealershipVehicleId = dealershipVehicleId; }

    public Integer getDealershipId() { return dealershipId; }

    public void setDealershipId(Integer dealershipId) { this.dealershipId = dealershipId; }

    public String getSubBrand() { return subBrand; }

    public void setSubBrand(String subBrand) { this.subBrand = subBrand; }

    public String getBrand() { return Brand; }

    public void setBrand(String brand) { Brand = brand; }

    public String getDealershipName() { return dealershipName; }

    public void setDealershipName(String dealershipName) { this.dealershipName = dealershipName; }

    public Double getPrice() { return price; }

    public void setPrice(Double price) { this.price = price; }

    public Integer getModel() { return model; }

    public void setModel(Integer model) { this.model = model; }

    public String getVersion() { return version; }

    public void setVersion(String version) { this.version = version; }

    public String getFuel() { return fuel; }

    public void setFuel(String fuel) { this.fuel = fuel; }

    public String getTransmission() { return transmission; }

    public void setTransmission(String transmission) { this.transmission = transmission; }

    public Integer getMileage() { return mileage; }

    public void setMileage(Integer mileage) { this.mileage = mileage; }

    public String getTraction() { return traction; }

    public void setTraction(String traction) { this.traction = traction; }

    public Double getDownPayment() { return downPayment; }

    public void setDownPayment(Double downPayment) { this.downPayment = downPayment; }

    public List<Color> getColors() { return colors; }

    public void setColors(List<Color> colors) { this.colors = colors; }

    public String getImage_url() { return image_url; }

    public void setImage_url(String image_url) { this.image_url = image_url; }
}
