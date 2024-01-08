package com.driveai.vehiclesms.dto;

import java.util.List;

public class ListImagesDto {
    private int dealershipVehicleId;
    private List<ImageDto> images;

    public int getDealershipVehicleId() {
        return dealershipVehicleId;
    }

    public void setDealershipVehicleId(int dealershipVehicleId) {
        this.dealershipVehicleId = dealershipVehicleId;
    }
    public List<ImageDto> getImages() {
        return images;
    }

    public void setImages(List<ImageDto> images) {
        this.images = images;
    }
}
