package com.driveai.vehiclesms.dto;

import java.net.URL;

public class S3AssetDto {

    private String name;
    private String key;
    private URL url;

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getKey() { return key; }

    public void setKey(String key) { this.key = key; }

    public URL getUrl() { return url; }

    public void setUrl(URL url) { this.url = url; }
}
