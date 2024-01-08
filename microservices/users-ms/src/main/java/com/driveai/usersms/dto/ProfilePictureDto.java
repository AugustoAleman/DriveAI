package com.driveai.usersms.dto;

public class ProfilePictureDto {
    private String image_url;

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public ProfilePictureDto(String image_url) {
        this.image_url = image_url;
    }
}
