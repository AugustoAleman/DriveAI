package com.driveai.usersms.dto;

public class CoordinatesDto {
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

    public CoordinatesDto(String longitude, String latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public CoordinatesDto() {
    }
}
