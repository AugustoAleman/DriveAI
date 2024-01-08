package com.driveai.vehiclesms.dto;

public class CreatDocumentDto {
    private Integer externalId;
    private String externalTable;
    private Integer documentRequiredId;
    private String storageUrl;

    public Integer getExternalId() { return externalId; }

    public void setExternalId(Integer externalId) { this.externalId = externalId; }

    public String getExternalTable() { return externalTable; }

    public void setExternalTable(String externalTable) { this.externalTable = externalTable; }

    public Integer getDocumentRequiredId() { return documentRequiredId; }

    public void setDocumentRequiredId(Integer documentRequiredId) { this.documentRequiredId = documentRequiredId; }

    public String getStorageUrl() { return storageUrl; }

    public void setStorageUrl(String storageUrl) { this.storageUrl = storageUrl; }
}
