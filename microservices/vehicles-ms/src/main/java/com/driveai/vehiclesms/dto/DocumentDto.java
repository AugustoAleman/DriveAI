package com.driveai.vehiclesms.dto;

import java.sql.Timestamp;

public class DocumentDto {
    private Integer documentId;
    private DocumentRequiredDto documentRequiredDto;
    private String externalTable;
    private String storageUrl;
    private String status;
    private boolean ocrChecked;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private boolean isDeleted;
    private Timestamp deletedAt;

    public Integer getDocumentId() { return documentId; }

    public void setDocumentId(Integer documentId) { this.documentId = documentId; }

    public DocumentRequiredDto getDocumentRequiredDto() { return documentRequiredDto; }

    public void setDocumentRequiredDto(DocumentRequiredDto documentRequiredDto) { this.documentRequiredDto = documentRequiredDto;}

    public String getExternalTable() { return externalTable; }

    public void setExternalTable(String externalTable) { this.externalTable = externalTable; }

    public String getStorageUrl() { return storageUrl; }

    public void setStorageUrl(String storageUrl) { this.storageUrl = storageUrl; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public boolean isOcrChecked() { return ocrChecked; }

    public void setOcrChecked(boolean ocrChecked) { this.ocrChecked = ocrChecked; }

    public Timestamp getCreatedAt() { return createdAt; }

    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }

    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    public boolean isDeleted() { return isDeleted; }

    public void setDeleted(boolean deleted) { isDeleted = deleted; }

    public Timestamp getDeletedAt() { return deletedAt; }

    public void setDeletedAt(Timestamp deletedAt) { this.deletedAt = deletedAt; }

}
