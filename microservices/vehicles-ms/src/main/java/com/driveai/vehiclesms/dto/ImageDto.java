package com.driveai.vehiclesms.dto;

import java.util.Date;

public class ImageDto {
    private int imageId;
    private String url;
    private int dealershipVehicleId;
    private boolean deleted;

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getDealershipVehicleId() {
        return dealershipVehicleId;
    }

    public void setDealershipVehicleId(int dealershipVehicleId) {
        this.dealershipVehicleId = dealershipVehicleId;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
