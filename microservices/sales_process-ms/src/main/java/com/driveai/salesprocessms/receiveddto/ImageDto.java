package com.driveai.salesprocessms.receiveddto;

import lombok.Data;

@Data
public class ImageDto {
    private int imageId;
    private String url;
    private int dealershipVehicleId;
    private boolean deleted;


}
