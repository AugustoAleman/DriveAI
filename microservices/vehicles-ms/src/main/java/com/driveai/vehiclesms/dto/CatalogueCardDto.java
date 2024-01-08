package com.driveai.vehiclesms.dto;

import java.util.List;

public class CatalogueCardDto {
    private Integer dealershipVehicleId;
    private String image;
    private Float price;
    private String brand;
    private String subBrand;
    private Integer model;
    private String dealershipName;
    private List<String> colors;
    private boolean isFavorite;

    public CatalogueCardDto() {
        this.isFavorite = false;
    }

    public Integer getDealershipVehicleId() {
        return dealershipVehicleId;
    }

    public void setDealershipVehicleId(Integer dealershipVehicleId) {
        this.dealershipVehicleId = dealershipVehicleId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getSubBrand() {
        return subBrand;
    }

    public void setSubBrand(String subBrand) {
        this.subBrand = subBrand;
    }

    public Integer getModel() {
        return model;
    }

    public void setModel(Integer model) {
        this.model = model;
    }

    public String getDealershipName() {
        return dealershipName;
    }

    public void setDealershipName(String dealershipName) {
        this.dealershipName = dealershipName;
    }

    public List<String> getColors() {
        return colors;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }

    public boolean isFavorite() {
        return isFavorite;
    }

    public void setFavorite(boolean favorite) {
        isFavorite = favorite;
    }
}
